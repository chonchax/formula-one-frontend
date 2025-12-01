import { useState, useEffect } from 'react'
import { api } from '../../services/ApiService'

const AddRaceResultsForm = ({ raceId, onCancel, onCreated }) => {
  const [drivers, setDrivers] = useState([])
  const [results, setResults] = useState([])
  const [season, setSeason] = useState('')
  const [seasonError, setSeasonError] = useState('')
  const [raceDate, setRaceDate] = useState('')

  useEffect(() => {
    const fetchDrivers = async () => {
      const data = await api.getAllDrivers()
      setDrivers(data.drivers)

      const prefilledTable = Array.from({ length: data.pagy.total_count }).map((_, i) => ({
        driver_id: '',
        team_id: '',
        position: i + 1,
        points: calculatePoints(i + 1),
        best_lap_time: ''
      }))
      setResults(prefilledTable)
    }
    fetchDrivers()
  }, [])

  const calculatePoints = (position) => {
    const pointsTable = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]
    return pointsTable[position - 1] || 0
  }

  const updateResult = (index, field, value) => {
    const updated = [...results]

    updated[index][field] = value

    if (field === 'driver_id') {
      const selectedDriver = drivers.find((driver) => driver.id === value)
      updated[index].team_id = selectedDriver?.team?.id || ''
    }

    setResults(updated)
  }

  const submit = async () => {
    if (!season) {
      setSeasonError('La saison est obligatoire')
      return
    }

    setSeasonError('')
    const payload = { race_id: raceId, season, race_date: raceDate, results }
    try {
      await api.addRaceResults(payload)
      onCreated()
    } catch (err) {
      console.error(err)
      alert('Erreur lors de l enregistrement des résultats')
    }
  }

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Season (ex: 2025)"
          className="border px-2 py-1 rounded"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        />
        <input
          type="date"
          className="border px-2 py-1 rounded"
          value={raceDate}
          onChange={(e) => setRaceDate(e.target.value)}
        />
        {seasonError && <span className="text-red-500 text-sm">{seasonError}</span>}
      </div>

      <table className="w-full bg-white rounded-lg">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-3 px-4 sm:px-6 lg:px-10 text-left">Pos</th>
            <th className="py-3 px-4 sm:px-6 lg:px-10 text-left">Driver</th>
            <th className="py-3 px-4 sm:px-6 lg:px-10 text-left hidden md:table-cell">Team</th>
            <th className="py-3 px-4 sm:px-6 lg:px-10 text-left">Best Lap</th>
            <th className="py-3 px-4 sm:px-6 lg:px-10 text-left hidden lg:table-cell">Points</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 sm:px-6 lg:px-10 font-bold">{result.position}</td>

              <td className="py-3 px-4 sm:px-6 lg:px-10">
                <select
                  value={result.driver_id}
                  onChange={(e) => updateResult(i, 'driver_id', e.target.value)}
                  className="border px-2 py-1 rounded w-full cursor-pointer"
                >
                  <option value="">Choisir…</option>
                  {drivers.map((driver) => {
                    const isTaken = results.some((r, idx) => idx !== i && r.driver_id === driver.id)
                    return (
                      <option key={driver.id} value={driver.id} disabled={isTaken}>
                        {driver.first_name} {driver.last_name}
                      </option>
                    )
                  })}
                </select>
              </td>

              <td className="py-3 px-4 sm:px-6 lg:px-10 font-semibold hidden md:table-cell">
                {drivers.find((driver) => driver.id === result.driver_id)?.team?.name || ''}
              </td>

              <td className="py-3 px-4 sm:px-6 lg:px-10">
                <input
                  type="text"
                  placeholder="1:12.308"
                  value={result.best_lap_time}
                  onChange={(e) => updateResult(i, 'best_lap_time', e.target.value)}
                  className="border px-2 py-1 rounded w-full"
                />
              </td>

              <td className="py-3 px-4 sm:px-6 lg:px-10 text-black font-bold hidden lg:table-cell">
                <input
                  type="number"
                  value={result.points}
                  readOnly
                  className="border px-2 py-1 rounded w-20"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-3 mt-4">
        <button onClick={submit} className="bg-primary text-white px-4 py-2 rounded">
          Enregistrer
        </button>
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
          Annuler
        </button>
      </div>
    </div>
  )
}

export default AddRaceResultsForm
