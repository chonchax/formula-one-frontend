import { AuthService } from './AuthService'

const BASE_URL = 'http://localhost:3001/api/v1'

const fetchApi = async (endpoint, options = {}) => {
  const token = sessionStorage.getItem('jwtToken')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : ''
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers })

  if (res.status === 401) {
    AuthService.handleUnauthorized()
  }

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(errorText || 'Erreur API')
  }

  if (res.status === 204) return null

  return res.json()
}

export const api = {
  signIn: async ({ email, password }) => {
    const res = await fetch(`${BASE_URL}/sign_in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { email, password } })
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || 'Login failed')
    }

    return res.json()
  },
  getTeamsRanking: (page = 1) => fetchApi(`/teams/ranking?page=${page}`),
  getTeams: (page = 1) => fetchApi(`/teams?page=${page}`),
  deleteTeam: (teamId) => fetchApi(`/teams/${teamId}`, { method: 'DELETE' }),
  getDriversRanking: (page = 1) => fetchApi(`/drivers/ranking?page=${page}`),
  getRaces: (page = 1) => fetchApi(`/races?page=${page}`),
  getDrivers: (page = 1) => fetchApi(`/drivers?page=${page}`),
  getAllDrivers: () => fetchApi(`/drivers?limit=1000`),
  deleteDriver: (driverId) => fetchApi(`/drivers/${driverId}`, { method: 'DELETE' }),
  getRaces: (page = 1) => fetchApi(`/races?page=${page}`),
  getRaceEditions: (raceId) => fetchApi(`/races/${raceId}/race_editions`),
  getResults: (raceEditionId) => fetchApi(`/race_editions/${raceEditionId}/results`),
  addRaceResults: (payload) =>
    fetchApi(`/results`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
}
