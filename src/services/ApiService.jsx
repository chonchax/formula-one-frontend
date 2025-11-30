const BASE_URL = 'http://localhost:3001/api/v1'

const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('jwtToken')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : ''
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })
  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(errorText || 'Erreur API')
  }

  if (res.status === 204) return null

  return res.json()
}

export const api = {
  getTeams: (page = 1) => fetchApi(`/teams?page=${page}`),
  deleteTeam: (teamId) => fetchApi(`/teams/${teamId}`, { method: 'DELETE' }),
  getDriversRanking: (page = 1) => fetchApi(`/drivers/ranking?page=${page}`),
  getRaces: (page = 1) => fetchApi(`/races?page=${page}`)
}
