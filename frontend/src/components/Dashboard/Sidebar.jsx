import { useState } from "react"
import {
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  CreditCard,
  FileText,
  HelpCircle,
  Shield,
} from "lucide-react"

// Modificar la función Sidebar para recibir y usar las props
function Sidebar({ activeItem = "dashboard", setActiveItem }) {
  // Modificar el estado inicial de sidebarOpen a false para que comience cerrado
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Añadir un nuevo estado para controlar si el sidebar está fijado (no se cierra al quitar el mouse)
  const [isPinned, setIsPinned] = useState(false)

  // Eliminamos el estado local activeItem y su setter
  // const [activeItem, setActiveItem] = useState("dashboard")

  const menuItems = [
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "sales", icon: ShoppingCart, label: "Ventas" },
    { id: "inventory", icon: Package, label: "Inventario" },
    { id: "customers", icon: Users, label: "Clientes" },
    { id: "users", icon: Shield, label: "Gestor de Usuarios" },
    { id: "reports", icon: FileText, label: "Reportes" },
    { id: "payments", icon: CreditCard, label: "Pagos" },
  ]

  // Modificar la función toggleSidebar para que también maneje el estado de fijado
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
    setIsPinned(!sidebarOpen) // Si lo estamos abriendo con el botón, lo fijamos
  }

  // Añadir estas funciones para manejar los eventos del mouse
  const handleMouseEnter = () => {
    if (!isPinned) {
      setSidebarOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isPinned) {
      setSidebarOpen(false)
    }
  }

  // Modificar el elemento aside para añadir los eventos del mouse
  return (
    <aside
      className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-md transition-all duration-300 ease-in-out relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Toggle button - Modificar el tooltip para indicar si fija o libera el sidebar */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-12 bg-white rounded-full p-1 shadow-md border border-gray-100 cursor-pointer hover:bg-[#f8f5f2] z-10"
        title={isPinned ? "Liberar sidebar" : "Fijar sidebar"}
      >
        <ChevronRight
          className={`h-4 w-4 text-[#5c4b44] transition-transform duration-300 ${sidebarOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Logo */}
      <div className="p-6 flex items-center">
        <div className="w-8 h-8 rounded-md bg-[#5c4b44] flex items-center justify-center text-white font-bold mr-3">
          P
        </div>
        {sidebarOpen && <h2 className="text-xl font-semibold text-[#5c4b44] truncate">POS System</h2>}
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <div className="px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center justify-start p-3 rounded-md transition-colors cursor-pointer
                ${
                  activeItem === item.id
                    ? "bg-[#f8f5f2] text-[#5c4b44] font-medium"
                    : "text-gray-600 hover:bg-[#f8f5f2]"
                }
              `}
            >
              <item.icon className="h-5 w-5 min-w-[20px]" />
              {sidebarOpen && <span className="ml-3 truncate">{item.label}</span>}
            </button>
          ))}
        </div>

        <div className="px-4 mt-8">
          <div className="h-px bg-gray-200 my-4"></div>

          <button className="w-full flex items-center justify-start p-3 text-gray-600 hover:bg-[#f8f5f2] rounded-md transition-colors cursor-pointer">
            <Settings className="h-5 w-5 min-w-[20px]" />
            {sidebarOpen && <span className="ml-3 truncate">Configuración</span>}
          </button>

          <button className="w-full flex items-center justify-start p-3 text-gray-600 hover:bg-[#f8f5f2] rounded-md transition-colors cursor-pointer">
            <HelpCircle className="h-5 w-5 min-w-[20px]" />
            {sidebarOpen && <span className="ml-3 truncate">Ayuda</span>}
          </button>
        </div>

        <div className="absolute bottom-0 w-full p-4">
          <button className="w-full flex items-center justify-start p-3 text-gray-600 hover:bg-[#f8f5f2] rounded-md transition-colors cursor-pointer">
            <LogOut className="h-5 w-5 min-w-[20px]" />
            {sidebarOpen && <span className="ml-3 truncate">Cerrar Sesión</span>}
          </button>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
