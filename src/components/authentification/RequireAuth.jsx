import { Navigate } from 'react-router-dom'
import { AuthService } from '../../services/AuthService'

const RequireAuth = ({ children }) => {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default RequireAuth
