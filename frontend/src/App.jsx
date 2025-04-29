"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  })

  useEffect(() => {
    const verifyAuth = async () => {
      // Verificar si hay un token almacenado
      const token = localStorage.getItem("token")

      if (!token) {
        setAuthState({ isAuthenticated: false, isLoading: false, user: null })
        return
      }

      try {
        console.log("Validando token...")
        const response = await fetch("http://localhost:3000/api/validate", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok) {
          const userData = JSON.parse(localStorage.getItem("user") || "{}")
          console.log("Token válido, usuario:", userData)
          setAuthState({ isAuthenticated: true, isLoading: false, user: userData })
        } else {
          console.log("Token inválido, respuesta:", response.status)
          throw new Error("Token inválido")
        }
      } catch (error) {
        console.error("Error validando token:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setAuthState({ isAuthenticated: false, isLoading: false, user: null })
      }
    }

    verifyAuth()
  }, [])

  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5c4b44]"></div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={authState.isAuthenticated ? <Navigate to="/dashboard" /> : <Login setAuthState={setAuthState} />}
        />
        <Route
          path="/dashboard/*"
          element={
            authState.isAuthenticated ? (
              <Dashboard authState={authState} setAuthState={setAuthState} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
