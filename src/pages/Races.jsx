import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PageHeader from '../components/PageHeader'
import RaceCard from '../components/RaceCard'
import { api } from '../services/ApiService'

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
      <div className="flex-1 flex justify-center px-4 md:px-6">
        <div className="w-full max-w-[1600px] mt-10 flex flex-col gap-6">
          {races.map((race) => (
            <RaceCard key={race.id} race={race} className="w-full max-w-[900px] mx-auto" />
          ))}

          <div className="flex justify-center gap-4 mt-8">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {'<'}
            </button>

            <span className="text-black font-semibold self-center">
              Page {page} / {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RacesPage
