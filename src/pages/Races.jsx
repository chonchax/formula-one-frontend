import { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import PageHeader from '../components/common/PageHeader'
import RaceList from '../components/races/RaceList'
import { api } from '../services/ApiService'
import Footer from '../components/common/Footer'

const RacesPage = () => {
  const [races, setRaces] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchRaces = async (page = 1) => {
    try {
      const data = await api.getRaces(page)
      setRaces(data.races || [])
      setTotalPages(data.pagy.total_pages)
    } catch (err) {
      console.error('Error fetching races:', err)
    }
  }

  useEffect(() => {
    fetchRaces(page)
  }, [page])

  return (
    <div className="min-h-screen bg-white-dark flex flex-col">
      <Navbar />
      <PageHeader title="Races" />
      <RaceList races={races} page={page} totalPages={totalPages} setPage={setPage} />
      <Footer />
    </div>
  )
}

export default RacesPage
