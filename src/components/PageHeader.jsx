const PageHeader = ({ title }) => {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 mt-30">
      <div className="flex max-tablet:flex-col justify-between items-start gap-px-24">
        <h2 className="text-4xl font-extrabold text-black font-headers">{title}</h2>
      </div>
    </div>
  )
}

export default PageHeader
