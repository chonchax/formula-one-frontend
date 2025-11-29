import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center bg-black-light pt-20">
        <h1 className="text-4xl font-title font-bold text-primary">Welcome to F1 Tracker</h1>
      </div>
    </div>
  )
}

export default Home
