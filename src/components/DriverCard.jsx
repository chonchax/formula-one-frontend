import { IconX } from '@tabler/icons-react'

const DriverCard = ({ driverName, teamName, color = '#222', onDelete }) => {
  return (
    <div
      className="relative rounded-lg p-6 flex flex-col justify-between gap-4 text-white min-h-[220px] max-h-[280px] shadow-md"
      style={{ backgroundColor: color }}
    >
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 flex items-center justify-center rounded-full hover:bg-black p-1"
        title="Supprimer ce pilote"
      >
        <IconX width={20} height={20} className="text-white" />
      </button>

      <h3 className="text-2xl font-bold">{driverName}</h3>

      <p className="text-lg">{teamName}</p>
    </div>
  )
}

export default DriverCard
