import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios.js'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(() => {
    try { return JSON.parse(localStorage.getItem('sw_user')) } catch { return null }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('sw_token')
    if (!token) { setLoading(false); return }
    api.get('/auth/me')
      .then(r => { setUser(r.data.user); localStorage.setItem('sw_user', JSON.stringify(r.data.user)) })
      .catch(() => { localStorage.removeItem('sw_token'); localStorage.removeItem('sw_user'); setUser(null) })
      .finally(() => setLoading(false))
  }, [])

  function login(token, userData) {
    localStorage.setItem('sw_token', token)
    localStorage.setItem('sw_user', JSON.stringify(userData))
    setUser(userData)
  }

  function logout() {
    localStorage.removeItem('sw_token')
    localStorage.removeItem('sw_user')
    setUser(null)
  }

  const isAdmin = () => user?.role === 'admin'

  return (
    <AuthCtx.Provider value={{ user, setUser, loading, login, logout, isAdmin }}>
      {children}
    </AuthCtx.Provider>
  )
}
