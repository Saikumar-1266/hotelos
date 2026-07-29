import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

const AdminLogin = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error)
      setMessage('Invalid email or password.')
    } else {
      navigate('/admin')
    }

    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
          HotelOS
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          Admin Login
        </h1>

        <p className="mt-2 text-slate-500">
          Sign in to manage hotel bookings and enquiries.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Admin Email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-slate-950 py-4 font-semibold text-white hover:bg-amber-400 hover:text-slate-950 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

          {message && (
            <p className="text-center text-sm font-semibold text-red-600">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  )
}

export default AdminLogin