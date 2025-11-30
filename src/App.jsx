import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Teams from './pages/Teams'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/" element={<Home />} />
      <Route path="/teams" element={<Teams />} />
    </Routes>
  )
}

export default App
