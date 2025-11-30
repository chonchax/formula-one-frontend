import { useState, useEffect } from 'react'
import { api } from '../../services/ApiService'

export default function ResultsTable({ raceEditionId }) {
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await api.getResults(raceEditionId)
        setResults(data.results)
      } catch (err) {
        console.error(err)
      }
    }
    fetchResults()
  }, [raceEditionId])

  return (
    <div className="overflow-x-auto mt-2">
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-3 px-4 sm:px-6 lg:px-10 text-left">Pos.</th>
            <th className="py-3 px-4 sm:px-6 lg:px-10 text-left">Pilote</th>
            <th className="py-3 px-4 sm:px-6 lg:px-10 text-left hidden sm:table-cell">Team</th>
            <th className="py-3 px-4 sm:px-6 lg:px-10 text-left hidden md:table-cell">Best Lap</th>
            <th className="py-3 px-4 sm:px-6 lg:px-10 text-right">Pts.</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 sm:px-6 lg:px-10 font-bold">{result.position}</td>
              <td className="py-3 px-4 sm:px-6 lg:px-10 text-black font-bold">
                {result.driver.first_name} {result.driver.last_name}
              </td>
              <td className="py-3 px-4 sm:px-6 lg:px-10 hidden md:table-cell text-black font-bold">
                {result.team.name}
              </td>
              <td className="py-3 px-4 sm:px-6 lg:px-10 hidden md:table-cell">
                {result.best_lap_time}
              </td>
              <td className="py-3 px-4 sm:px-6 lg:px-10 text-black font-bold text-right">
                {result.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
