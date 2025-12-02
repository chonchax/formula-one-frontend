import { useState, useEffect } from 'react'
import ResultsTable from './ResultsTable'
import AddRaceResultsForm from './AddRaceResultsFrom'
import { api } from '../../services/ApiService'

const RaceEditionList = ({ raceId }) => {
  const [editions, setEditions] = useState([])
  const [selectedEdition, setSelectedEdition] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [message, setMessage] = useState('')

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
            className={`px-3 py-1 rounded-md border transition cursor-pointer hover:text-hover ${
              selectedEdition?.id === ed.id
                ? 'bg-primary text-white font-bold hover:text-white'
                : 'bg-gray-100 text-gray-800 font-bold'
            }`}
            onClick={() => {
              setSelectedEdition(ed)
              setShowAddForm(false)
            }}
          >
            {ed.season}
          </button>
        ))}

        <button
          className={`px-3 py-1 rounded-md border font-semibold cursor-pointer transition-colors
    ${showAddForm ? 'bg-primary text-white' : 'bg-green-100 text-black hover:text-hover'}`}
          onClick={() => {
            setShowAddForm(true)
            setSelectedEdition(null)
          }}
        >
          + Ajouter
        </button>
      </div>

      {showAddForm && (
        <AddRaceResultsForm
          raceId={raceId}
          onCancel={() => setShowAddForm(false)}
          onCreated={() => {
            setShowAddForm(false)
            api.getRaceEditions(raceId).then((data) => setEditions(data.editions))
            setMessage('Résultats ajoutés avec succès !')
            setTimeout(() => setMessage(''), 3000)
          }}
        />
      )}

      {selectedEdition && <ResultsTable raceEditionId={selectedEdition.id} />}

      {message && (
        <div className="fixed top-26 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {message}
        </div>
      )}
    </div>
  )
}

export default RaceEditionList
