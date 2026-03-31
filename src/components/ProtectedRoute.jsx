import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children, requireSpace = true }) => {
  const { user, space, loading } = useAuth()

  if (loading) {
    return null
  }

  // Not logged in — redirect to login page
  if (!user) {
    return <Navigate to='/login' />
  }

  // Logged in but no space → go to setup
  if (requireSpace && !space) return <Navigate to='/setup' />

  return children
}
