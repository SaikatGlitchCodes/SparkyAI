import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div>Loading...</div> // Or a nice loading spinner
  }
  
  if (!user) {
    return <Navigate to="/signin" replace />
  }
  
  return children
}

export default ProtectedRoute