import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/ApiService'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const data = await api.signIn({ email, password })
      localStorage.setItem('jwtToken', data.token)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Erreur serveur')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-title font-bold text-white mb-6 text-center">
          Formula One Tracker
        </h1>

        {error && (
          <p className="text-white bg-red-600 px-3 py-2 rounded mb-4 text-center font-semibold">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 text-black placeholder-gray-500 bg-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 text-black placeholder-gray-500 bg-white"
          />
          <button
            type="submit"
            className="bg-primary text-white py-2 rounded font-semibold hover:text-black cursor-pointer transition border border-primary"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
