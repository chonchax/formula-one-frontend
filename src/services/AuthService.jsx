export const AuthService = {
  getToken: () => localStorage.getItem('jwtToken'),
  isAuthenticated: () => !!localStorage.getItem('jwtToken'),
  logout: () => localStorage.removeItem('jwtToken')
}
