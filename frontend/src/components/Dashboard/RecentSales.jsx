import { ShoppingCart, MoreVertical, Check, Clock } from "lucide-react"

function RecentSales() {
  // Sample data for recent sales
  const recentSales = [
    { id: 1001, time: "10 minutos", amount: "$145.80", status: "completed" },
    { id: 1002, time: "25 minutos", amount: "$237.50", status: "completed" },
    { id: 1003, time: "40 minutos", amount: "$89.25", status: "pending" },
    { id: 1004, time: "1 hora", amount: "$432.00", status: "completed" },
    { id: 1005, time: "2 horas", amount: "$76.99", status: "pending" },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#5c4b44]">Ventas Recientes</h3>
          <button className="text-sm text-[#5c4b44] hover:underline cursor-pointer">Ver todas</button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {recentSales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between p-3 hover:bg-[#f8f5f2] rounded-md transition-colors cursor-pointer"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#f8f5f2] flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-[#5c4b44]" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">Orden #{sale.id}</p>
                  <p className="text-xs text-gray-500">Hace {sale.time}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-right mr-4">
                  <p className="text-sm font-medium text-gray-800">{sale.amount}</p>
                  <p
                    className={`text-xs flex items-center ${sale.status === "completed" ? "text-green-500" : "text-amber-500"}`}
                  >
                    {sale.status === "completed" ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Completada
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        Pendiente
                      </>
                    )}
                  </p>
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

export default RecentSales
