import { AlertCircle, MoreVertical } from "lucide-react"

function LowStockProducts() {
  // Sample data for low stock products
  const lowStockProducts = [
    { id: 1, name: "Laptop HP Pavilion", sku: "PRD-1001", stock: 3 },
    { id: 2, name: 'Monitor Dell 27"', sku: "PRD-1002", stock: 5 },
    { id: 3, name: "Teclado Mecánico RGB", sku: "PRD-1003", stock: 2 },
    { id: 4, name: "Mouse Inalámbrico", sku: "PRD-1004", stock: 4 },
    { id: 5, name: "Audífonos Bluetooth", sku: "PRD-1005", stock: 1 },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#5c4b44]">Productos con Bajo Stock</h3>
          <button className="text-sm text-[#5c4b44] hover:underline cursor-pointer">Ver todos</button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {lowStockProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-3 hover:bg-[#f8f5f2] rounded-md transition-colors cursor-pointer"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#f8f5f2] flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-[#5c4b44]" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-right mr-4">
                  <p className="text-sm font-medium text-gray-800">{product.stock} unidades</p>
                  <p className="text-xs text-red-500">Stock bajo</p>
                </div>
                <button className="p-1 rounded-md hover:bg-gray-100">
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LowStockProducts
