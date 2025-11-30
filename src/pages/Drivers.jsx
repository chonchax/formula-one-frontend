import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PageHeader from '../components/PageHeader'
import DriversGrid from '../components/DriversGrid'
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

const DriversPage = () => {
  const [drivers, setDrivers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [message, setMessage] = useState('')

  const fetchDrivers = async (page = 1) => {
    try {
      const data = await api.getDrivers(page)
      setDrivers(data.drivers || [])
      setTotalPages(data.pagy.total_pages)
    } catch (err) {
      console.error('Error fetching drivers:', err)
    }
  }

  const handleDelete = async (driverId) => {
    if (!confirm('Voulez-vous vraiment supprimer ce pilote ?')) return

    try {
      await api.deleteDriver(driverId)
      setMessage('Pilote supprimée avec succès !')
      fetchDrivers(page)
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      console.error(err)
      setMessage('Erreur lors de la suppression')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  useEffect(() => {
    fetchDrivers(page)
  }, [page])

  return (
    <div className="min-h-screen bg-white-dark flex flex-col">
      <Navbar />
      <PageHeader title="Drivers" />
      <DriversGrid
        drivers={drivers}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        teamColors={teamColors}
        onDelete={handleDelete}
        message={message}
      />
    </div>
  )
}

export default DriversPage
