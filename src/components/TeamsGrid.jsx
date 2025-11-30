import TeamCard from './TeamCard'

const defaultColor = '#1a1a1a'

const TeamsGrid = ({ teams, teamColors, onDelete, page, setPage, totalPages, message }) => {
  return (
    <>
      <div className="flex-1 flex justify-center px-6">
        <div className="w-full max-w-[1600px] mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              teamName={team.name}
              location={team.location}
              color={teamColors[team.name] || defaultColor}
              onDelete={() => onDelete(team.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page <= 1}
          onClick={() => setPage((page) => page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          {'<'}
        </button>
        <span className="px-4 py-2">
          {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((page) => page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          {'>'}
        </button>
      </div>

      {message && (
        <div className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded shadow-lg">
          {message}
        </div>
      )}
    </>
  )
}

export default TeamsGrid
