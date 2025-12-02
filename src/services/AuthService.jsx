export const AuthService = {
  getToken: () => sessionStorage.getItem('jwtToken'),
  isAuthenticated: () => !!sessionStorage.getItem('jwtToken'),
  logout: () => {
    sessionStorage.removeItem('jwtToken')
    window.location.href = '/login'
  },

  handleUnauthorized: () => {
    AuthService.logout()
    throw new Error('Session expirée. Veuillez vous reconnecter.')
  }
}
