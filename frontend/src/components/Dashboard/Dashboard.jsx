"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import StatsCards from "./StatsCards"
import RecentSales from "./RecentSales"
import LowStockProducts from "./LowStockProducts"
import QuickActions from "./QuickActions"
import UserManager from "../UserManager/UserManager"

function Dashboard({ user, onLogout }) {
  const [activeModule, setActiveModule] = useState("dashboard")

  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId)
  }

  const renderContent = () => {
    try {
      switch (activeModule) {
        case "users":
          return <UserManager />
        case "dashboard":
        default:
          return (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-[#5c4b44]">Dashboard</h1>
                <p className="text-gray-600">Bienvenido de nuevo, {user?.name || "Admin"}</p>
              </div>
              <StatsCards />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <RecentSales />
                <LowStockProducts />
              </div>
              <QuickActions />
            </>
          )
      }
    } catch (error) {
      console.error("Error rendering content:", error)
      return (
        <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
          <h3 className="text-lg font-medium">Ha ocurrido un error</h3>
          <p>No se pudo cargar el contenido. Por favor, intenta recargar la página.</p>
        </div>
      )
    }
  }

  return (
    <div className="flex h-screen bg-[#f8f5f2]">
      <Sidebar activeItem={activeModule} setActiveItem={handleModuleChange} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} />

        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

export default Dashboard
