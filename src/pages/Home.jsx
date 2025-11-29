import { useState } from 'react'
import Navbar from '../components/Navbar'
import RankingTable from '../components/RankingTable'

const Home = () => {
  return (
    <div className="min-h-screen bg-white-dark flex flex-col">
      <Navbar />

      <div className="flex-1 flex justify-center mt-32 px-6 ">
        <div className="w-full max-w-[1600px]">
          <RankingTable />
        </div>
      </div>
    </div>
  )
}

export default Home
