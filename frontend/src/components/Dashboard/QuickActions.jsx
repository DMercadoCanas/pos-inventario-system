import { ShoppingCart, Package, Users, Plus, Tag, FileText } from "lucide-react"

function QuickActions() {
  // Quick action buttons
  const actions = [
    { icon: ShoppingCart, label: "Nueva Venta", color: "#5c4b44" },
    { icon: Package, label: "Añadir Producto", color: "#5c4b44" },
    { icon: Users, label: "Nuevo Cliente", color: "#5c4b44" },
    { icon: Tag, label: "Nueva Categoría", color: "#5c4b44" },
    { icon: FileText, label: "Generar Reporte", color: "#5c4b44" },
    { icon: Plus, label: "Más Acciones", color: "#5c4b44" },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-[#5c4b44] mb-4">Acciones Rápidas</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-[#f8f5f2] rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <action.icon className="h-6 w-6 mb-2" style={{ color: action.color }} />
            <span className="text-sm text-gray-700 text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
