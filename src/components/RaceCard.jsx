import { useState } from 'react'
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react'
import RaceEditionList from './RaceEditionList'

const RaceCard = ({ race }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div>
          <h2 className="font-bold text-lg">{race.name}</h2>
          <p className="text-gray-500">{race.location}</p>
          <p className="text-sm text-gray-400">All time best: {race.all_time_best_time}</p>
        </div>
        <div className="text-primary font-bold">
          {open ? (
            <IconCaretUpFilled width={32} height={32} className="text-primary" />
          ) : (
            <IconCaretDownFilled width={32} height={32} className="text-primary" />
          )}
        </div>
      </div>

      {open && <RaceEditionList raceId={race.id} />}
    </div>
  )
}

export default RaceCard
