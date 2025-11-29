import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3001/api/v1/sign_in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { email, password } })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }

      localStorage.setItem('jwtToken', data.token)
    } catch (err) {
      setError('Server error')
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-light p-4">
      <div className="bg-primary-dark p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-title font-bold text-white mb-6 text-center">
          Formula One Tracker
        </h1>

        {error && (
          <p className="text-white bg-red-800 px-3 py-2 rounded mb-4 text-center font-semibold">
            {error}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-white-dark rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-black placeholder-black-light bg-primary-light"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-white-dark rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-black placeholder-black-light bg-primary-light"
          />
          <button
            type="submit"
            className="bg-white text-black-lighter py-2 rounded font-semibold hover:bg-white-dark transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
