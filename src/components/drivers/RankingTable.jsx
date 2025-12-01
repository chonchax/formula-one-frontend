import { useState, useEffect } from 'react'
import { api } from '../../services/ApiService'

const RankingTable = () => {
  const [drivers, setDrivers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchDrivers = async (page = 1) => {
    try {
      const data = await api.getDriversRanking(page)
      setDrivers(data.drivers || [])
      setTotalPages(data.pagy.total_pages)
    } catch (err) {
      console.error('Error fetching drivers:', err)
    }
  }

  useEffect(() => {
    fetchDrivers(page)
  }, [page])

  const nextPage = () => page < totalPages && setPage(page + 1)
  const prevPage = () => page > 1 && setPage(page - 1)

  return (
    <div className="flex-1 flex justify-center px-6">
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 sm:px-6 lg:px-10 text-left">Pos.</th>
                <th className="py-3 px-4 sm:px-6 lg:px-10 text-left">Pilote</th>
                <th className="py-3 px-4 sm:px-6 lg:px-10 text-left hidden sm:table-cell">#</th>
                <th className="py-3 px-4 sm:px-6 lg:px-10 text-left hidden md:table-cell">
                  Nationality
                </th>
                <th className="py-3 px-4 sm:px-6 lg:px-10 text-left hidden md:table-cell">Team</th>
                <th className="py-3 px-4 sm:px-6 lg:px-10 text-right">Pts.</th>
              </tr>
            </thead>

            <tbody>
              {drivers.map((driver, index) => (
                <tr
                  key={driver.id}
                  className="border-b border-border hover:bg-primary-light transition-colors"
                >
                  <td className="py-3 px-4 sm:px-6 lg:px-10 font-bold">
                    {(page - 1) * 10 + index + 1}
                  </td>

                  <td className="py-3 px-4 sm:px-6 lg:px-10 text-black font-bold">
                    <div className="flex flex-col sm:flex-row sm:gap-1">
                      <span>{driver.first_name}</span>
                      <span>{driver.last_name}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 sm:px-6 lg:px-10 hidden sm:table-cell">
                    {driver.number}
                  </td>

                  <td className="py-3 px-4 sm:px-6 lg:px-10 hidden md:table-cell">
                    {driver.nationality}
                  </td>

                  <td className="py-3 px-4 sm:px-6 lg:px-10 hidden md:table-cell text-black font-bold">
                    {driver.team.name}
                  </td>

                  <td className="py-3 px-4 sm:px-6 lg:px-10 text-black font-bold text-right">
                    {driver.total_points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {'<'}
          </button>

          <span className="text-black font-semibold self-center">
            Page {page} / {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RankingTable
