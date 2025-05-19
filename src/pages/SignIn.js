import React, { useState } from 'react'
import { 
  Box,
  Button, 
  Heading, 
  Text, 
  Link, 
  VStack,
  Flex,
  Field,
  Input,
  Alert
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const MotionBox = motion(Box)

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleAuth = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      let result
      if (isSignUp) {
        result = await signUp(email, password)
      } else {
        result = await signIn(email, password)
      }
      
      if (!result.success) {
        setError(result.error)
        setIsLoading(false)
        return
      }
      
      // Successful login/signup
      navigate('/')
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex 
      minHeight="100vh" 
      width="full" 
      align="center" 
      justifyContent="center"
      backgroundColor="green.50"
    >
      <MotionBox 
        p={8} 
        maxWidth="500px" 
        borderWidth={1} 
        borderRadius="lg" 
        boxShadow="lg" 
        bg="white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box textAlign="center">
          <Heading size="lg" mb={6}>
            {isSignUp ? 'Create Your Account' : 'Sign in to Farm Analytics'} 
          </Heading>
        </Box>
        
        {error && (
          <Alert.Root status="error" mb={4} borderRadius="md">
            <Alert.Indicator />
            <Alert.Description>{error}</Alert.Description>
          </Alert.Root>
        )}
        
        <form onSubmit={handleAuth}>
          <VStack spacing={4}>
            <Field.Root isRequired>
              <Field.Label>Email address</Field.Label>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="white"
              />
            </Field.Root>
            
            <Field.Root isRequired>
              <Field.Label>Password</Field.Label>
              <Input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="white"
              />
            </Field.Root>
            
            <Button
              type="submit"
              colorScheme="green"
              width="full"
              mt={4}
              isLoading={isLoading}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </VStack>
        </form>
        
        <Box mt={6} textAlign="center">
          <Text>
            {isSignUp 
              ? 'Already have an account?' 
              : "Don't have an account?"}{' '}
            <Link
              color="green.500"
              onClick={() => setIsSignUp(!isSignUp)}
              cursor="pointer"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Link>
          </Text>
        </Box>
      </MotionBox>
    </Flex>
  )
}