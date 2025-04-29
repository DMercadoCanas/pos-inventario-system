import { DollarSign, Package, Users, TrendingUp, TrendingDown, Layers } from "lucide-react"

function StatsCards() {
  // Sample data for stats cards
  const stats = [
    {
      title: "Ventas Hoy",
      value: "$2,854",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "#5c4b44",
    },
    {
      title: "Productos",
      value: "248",
      subtitle: "12 con bajo stock",
      icon: Package,
      color: "#5c4b44",
    },
    {
      title: "Clientes",
      value: "1,375",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "#5c4b44",
    },
    {
      title: "Categorías",
      value: "32",
      subtitle: "5 categorías activas",
      icon: Layers,
      color: "#5c4b44",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              {stat.change && (
                <p
                  className={`text-xs flex items-center mt-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change} desde ayer
                </p>
              )}
              {stat.subtitle && <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>}
            </div>
            <div className="bg-[#f8f5f2] p-3 rounded-full">
              <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
