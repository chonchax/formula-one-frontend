import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Teams from './pages/Teams'
import Drivers from './pages/Drivers'
import RacesPage from './pages/Races'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/" element={<Home />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/drivers" element={<Drivers />} />
      <Route path="/races" element={<RacesPage />} />
    </Routes>
  )
}

export default App
