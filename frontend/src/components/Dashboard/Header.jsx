"use client"

import { useState } from "react"
import { Search, Bell, ChevronDown, Menu, X } from "lucide-react"

function Header({ user, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <header className="bg-white shadow-sm z-20">
      <div className="flex items-center justify-between p-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 rounded-md text-gray-600 hover:bg-[#f8f5f2] md:hidden"
        >
          {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Search */}
        <div className="hidden md:flex relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar productos, clientes..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#5c4b44] focus:border-[#5c4b44]"
          />
        </div>

        {/* Right side controls */}
        <div className="flex items-center">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowProfile(false)
              }}
              className="p-2 rounded-md text-gray-600 hover:bg-[#f8f5f2] relative cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700">Notificaciones</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="px-4 py-3 hover:bg-[#f8f5f2] border-b border-gray-100 cursor-pointer">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#5c4b44] bg-opacity-10 flex items-center justify-center mr-3">
                          <Bell className="h-4 w-4 text-[#5c4b44]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Nuevo pedido recibido</p>
                          <p className="text-xs text-gray-500">Hace {item * 5} minutos</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button className="text-sm text-[#5c4b44] hover:underline w-full text-center cursor-pointer">
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative ml-4">
            <button
              onClick={() => {
                setShowProfile(!showProfile)
                setShowNotifications(false)
              }}
              className="flex items-center cursor-pointer"
            >
              <img
                className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                src={`https://ui-avatars.com/api/?name=${user?.name || "Admin"}&background=5c4b44&color=fff`}
                alt="User avatar"
              />
              <div className="ml-2 hidden md:block">
                <div className="text-sm font-medium text-gray-700">{user?.name || "Admin"}</div>
                <div className="text-xs text-gray-500">{user?.email || "admin@pos.com"}</div>
              </div>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </button>

            {/* Profile dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f8f5f2] w-full text-left cursor-pointer">
                  Mi Perfil
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f8f5f2] w-full text-left cursor-pointer">
                  Configuración
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f8f5f2] w-full text-left cursor-pointer"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search - shown when menu is open */}
      {showMobileMenu && (
        <div className="p-4 border-t border-gray-200 md:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#5c4b44] focus:border-[#5c4b44]"
            />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
