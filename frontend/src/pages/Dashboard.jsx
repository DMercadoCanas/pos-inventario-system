"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Dashboard from "../components/Dashboard/Dashboard"

const DashboardPage = ({ authState, setAuthState }) => {
  const navigate = useNavigate()

  // Verificación completa de autenticación - simplificada para evitar duplicación
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setAuthState({ isAuthenticated: false, isLoading: false, user: null })
    navigate("/")
  }

  return <Dashboard onLogout={handleLogout} user={authState.user} />
}

export default DashboardPage
