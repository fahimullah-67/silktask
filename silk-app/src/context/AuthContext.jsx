import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as api from '../utils/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('silkAuth')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setUser(parsed.user)
        setToken(parsed.token)
      } catch {
        localStorage.removeItem('silkAuth')
      }
    }
    setLoading(false)
  }, [])

  const saveAuth = (nextUser, nextToken) => {
    const auth = { user: nextUser, token: nextToken }
    localStorage.setItem('silkAuth', JSON.stringify(auth))
    setUser(nextUser)
    setToken(nextToken)
  }

  const login = async (credentials) => {
    const data = await api.login(credentials)
    saveAuth({ _id: data._id, name: data.name, email: data.email }, data.token)
    return data
  }

  const register = async (userData) => {
    const data = await api.register(userData)
    saveAuth({ _id: data._id, name: data.name, email: data.email }, data.token)
    return data
  }

  const updateProfile = async (profileData) => {
    const data = await api.updateProfile(profileData, token)
    saveAuth({ _id: data._id, name: data.name, email: data.email }, data.token)
    return data
  }

  const logout = () => {
    localStorage.removeItem('silkAuth')
    setUser(null)
    setToken(null)
  }

  const value = useMemo(
    () => ({ user, token, loading, login, register, logout, isAuthenticated: Boolean(token) }),
    [user, token, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
