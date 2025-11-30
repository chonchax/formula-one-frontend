import { useState, useEffect } from 'react'
import ResultsTable from './ResultsTable'
import { api } from '../services/ApiService'

const RaceEditionList = ({ raceId }) => {
  const [editions, setEditions] = useState([])
  const [selectedEdition, setSelectedEdition] = useState(null)

  useEffect(() => {
    const fetchEditions = async () => {
      try {
        const data = await api.getRaceEditions(raceId)
        setEditions(data.editions)
      } catch (err) {
        console.error(err)
      }
    }
    fetchEditions()
  }, [raceId])

  return (
    <div className="mt-4 ml-4 flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {editions.map((ed) => (
          <button
            key={ed.id}
            className={`px-3 py-1 rounded-md border ${
              selectedEdition?.id === ed.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'
            }`}
            onClick={() => setSelectedEdition(ed)}
          >
            {ed.season}
          </button>
        ))}
        <button className="px-3 py-1 rounded border bg-green-100 text-green-700">+ Ajouter</button>
      </div>

      {selectedEdition && <ResultsTable raceEditionId={selectedEdition.id} />}
    </div>
  )
}

export default RaceEditionList
