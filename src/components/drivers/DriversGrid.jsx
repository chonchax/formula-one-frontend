import DriverCard from './DriverCard'

const defaultColor = '#1a1a1a'

const DriversGrid = ({ drivers, teamColors, onDelete, page, setPage, totalPages, message }) => {
  return (
    <>
      <div className="flex-1 flex justify-center px-6">
        <div className="w-full max-w-[1600px] mt-10 grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {drivers.map((driver) => (
            <DriverCard
              key={driver.id}
              driverName={`${driver.first_name} ${driver.last_name}`}
              teamName={driver.team.name}
              color={teamColors[driver.team.name] || defaultColor}
              onDelete={() => onDelete(driver.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page <= 1}
          onClick={() => setPage((page) => page - 1)}
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {'<'}
        </button>

        <span className="text-black font-semibold self-center">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((page) => page + 1)}
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {'>'}
        </button>
      </div>
      {message && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {message}
        </div>
      )}
    </>
  )
}

export default DriversGrid
