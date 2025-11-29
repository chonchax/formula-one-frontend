import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import TeamCard from '../components/TeamCard'
import PageHeader from '../components/PageHeader'

const teamColors = {
  Alpine: '#0052B1',
  'Aston Martin': '#006F62',
  Ferrari: '#DC0000',
  Haas: '#787878',
  'Kick Sauber': '#006EFF',
  McLaren: '#FF8700',
  Mercedes: '#00D2BE',
  'Racing Bulls': '#0600EF',
  'Red Bull Racing': '#1E41FF',
  Williams: '#37BEDD'
}

const defaultColor = '#222'

const TeamsPage = () => {
  const [teams, setTeams] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [message, setMessage] = useState('')

  const fetchTeams = async (page = 1) => {
    try {
      const res = await fetch(`http://localhost:3001/api/v1/teams?page=${page}`)
      const data = await res.json()
      setTeams(data.teams || [])
      setTotalPages(data.pagy.total_pages)
    } catch (err) {
      console.error('Error fetching teams:', err)
    }
  }

  const handleDelete = async (teamId) => {
    if (!confirm('Voulez-vous vraiment supprimer cette écurie ?')) return

    try {
      const token = localStorage.getItem('jwtToken')
      const res = await fetch(`http://localhost:3001/api/v1/teams/${teamId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (res.status === 204) {
        setMessage('Écurie supprimée avec succès !')
        fetchTeams(page)
        setTimeout(() => setMessage(''), 3000)
      } else {
        throw new Error('Erreur suppression')
      }
    } catch (err) {
      console.error('Erreur suppression team:', err)
      setMessage('Erreur lors de la suppression')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  useEffect(() => {
    fetchTeams(page)
  }, [page])

  return (
    <div className="min-h-screen bg-white-dark flex flex-col">
      <Navbar />
      <PageHeader title="Teams" />

      <div className="flex-1 flex justify-center px-6">
        <div className="w-full max-w-[1600px] mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              teamName={team.name}
              location={team.location}
              color={teamColors[team.name] || defaultColor}
              onDelete={() => handleDelete(team.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page <= 1}
          onClick={() => setPage((page) => page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          {'<'}
        </button>
        <span className="px-4 py-2">
          {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((page) => page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          {'>'}
        </button>
      </div>

      {message && (
        <div className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded shadow-lg">
          {message}
        </div>
      )}
    </div>
  )
}

export default TeamsPage
