import { createContext, useContext, useEffect, useMemo, useState } from "react"
import api from "../api/axiosConfig"

const AuthContext = createContext(null)

function decodeToken(token) {
  try {
    const payload = token.split(".")[1]
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/")
    const decoded = atob(normalized)
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!token) {
      setUser(null)
      delete api.defaults.headers.common.Authorization
      return
    }

    const payload = decodeToken(token)

    if (!payload) {
      localStorage.removeItem("token")
      setToken(null)
      setUser(null)
      delete api.defaults.headers.common.Authorization
      return
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser({
      username: payload.sub,
      roles: payload.roles || [],
      exp: payload.exp,
    })
  }, [token])

  function login(newToken) {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }

  function logout() {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    delete api.defaults.headers.common.Authorization
  }

  const contextValue = useMemo(() => {
    const roles = user?.roles || []
    const isAdmin = roles.includes("ROLE_ADMIN")
    const isAuthenticated = Boolean(token)

    return {
      token,
      user,
      roles,
      isAdmin,
      isAuthenticated,
      login,
      logout,
    }
  }, [token, user])

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}
