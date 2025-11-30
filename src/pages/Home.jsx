import { useState } from 'react'
import Navbar from '../components/Navbar'
import RankingTable from '../components/RankingTable'
import PageHeader from '../components/PageHeader'

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
