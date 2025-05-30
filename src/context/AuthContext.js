import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { toaster } from '../components/ui/toaster'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)

  // Load auth state and user profile on mount
  useEffect(() => {
    async function loadUserSession() {
      setLoading(true)
      
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          setUser(session.user)
          // Fetch user profile data
          await fetchUserProfile(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
        }
      } catch (error) {
        console.error('Error loading auth state:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadUserSession()
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Fetch user profile from profiles table
  const fetchUserProfile = async (userId) => {
    setProfileLoading(true)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (error) throw error
      
      setProfile(data || null)
      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      setProfile(null)
      return null
    } finally {
      setProfileLoading(false)
    }
  }

  // Create or update user profile
  const updateUserProfile = async (profileData) => {
    if (!user) return { success: false, error: 'User not authenticated' }
    
    try {
      const updates = {
        ...profileData,
        user_id: user.id,           // Explicitly add user_id
        updated_at: new Date()
      }
      
      // Check if the profile exists first
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      let result
      
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from('profiles')
          .update(updates)
          .eq('user_id', user.id)
      } else {
        // Insert new profile
        result = await supabase
          .from('profiles')
          .insert([{ ...updates, created_at: new Date() }])
      }
      
      if (result.error) throw result.error
      
      // Refresh the profile data
      await fetchUserProfile(user.id)
      
      return { success: true }
    } catch (error) {
      console.error('Error updating profile:', error)
      return { success: false, error: error.message }
    }
  }

  // Upload profile image
  const uploadProfileImage = async (file) => {
    if (!user) return { success: false, error: 'User not authenticated' }
    
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `profile-images/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('user-content')
        .upload(filePath, file)
      
      if (uploadError) throw uploadError
      
      const { data: { publicUrl } } = supabase.storage
        .from('user-content')
        .getPublicUrl(filePath)
      
      // Update profile with new image URL
      await updateUserProfile({ avatar_url: publicUrl })
      
      return { success: true, url: publicUrl }
    } catch (error) {
      console.error('Error uploading image:', error)
      return { success: false, error: error.message }
    }
  }

  // Check if profile is complete
  const isProfileComplete = () => {
    if (!profile) return false
    
    // Define required fields for a complete profile
    const requiredFields = ['full_name', 'farm_name', 'location']
    
    return requiredFields.every(field => !!profile[field])
  }

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      
      // Fetch user profile after successful sign-in
      if (data.user) {
        await fetchUserProfile(data.user.id)
      }
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signUp = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      return { success: true, user: data.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setProfile(null)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    signIn,
    signUp,
    signOut,
    user,
    profile,
    loading,
    profileLoading,
    fetchUserProfile,
    updateUserProfile,
    uploadProfileImage,
    isProfileComplete
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}