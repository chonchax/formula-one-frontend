import { useState } from 'react'
import Navbar from '../components/common/Navbar'
import RankingTable from '../components/drivers/RankingTable'
import PageHeader from '../components/common/PageHeader'
import Footer from '../components/common/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-white-dark flex flex-col">
      <Navbar />
      <PageHeader title="Drivers' Standings" />
      <RankingTable />
      <Footer />
    </div>
  )
}

export default Home
