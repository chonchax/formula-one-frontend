import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/HomePage'
import Teams from './pages/Teams'
import Drivers from './pages/Drivers'
import RacesPage from './pages/Races'
import RequireAuth from './components/authentification/RequireAuth'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/teams"
        element={
          <RequireAuth>
            <Teams />
          </RequireAuth>
        }
      />
      <Route
        path="/drivers"
        element={
          <RequireAuth>
            <Drivers />
          </RequireAuth>
        }
      />
      <Route
        path="/races"
        element={
          <RequireAuth>
            <RacesPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
