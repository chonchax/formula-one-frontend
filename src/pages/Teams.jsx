import { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import PageHeader from '../components/common/PageHeader'
import TeamsGrid from '../components/teams/TeamsGrid'
import { api } from '../services/ApiService'

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

const TeamsPage = () => {
  const [teams, setTeams] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const fetchTeams = async (page = 1) => {
    try {
      const data = await api.getTeams(page)
      setTeams(data.teams || [])
      setTotalPages(data.pagy.total_pages)
    } catch (err) {
      console.error('Error fetching teams:', err)
    }
  }

  const handleDelete = async (teamId) => {
    if (!confirm('Voulez-vous vraiment supprimer cette écurie ?')) return

    try {
      await api.deleteTeam(teamId)
      setIsError(false)
      setMessage('Écurie supprimée avec succès !')
      fetchTeams(page)
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error(err)
      setIsError(true)
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
      <TeamsGrid
        teams={teams}
        teamColors={teamColors}
        onDelete={handleDelete}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        message={message}
      />
      <Footer />
    </div>
  )
}

export default TeamsPage
