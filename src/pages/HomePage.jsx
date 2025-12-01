import { useState } from 'react'
import Navbar from '../components/common/Navbar'
import RankingTable from '../components/drivers/RankingTable'
import PageHeader from '../components/common/PageHeader'

const Home = () => {
  return (
    <div className="min-h-screen bg-white-dark flex flex-col">
      <Navbar />
      <PageHeader title="Drivers' Standings" />
      <RankingTable />
    </div>
  )
}

export default Home
