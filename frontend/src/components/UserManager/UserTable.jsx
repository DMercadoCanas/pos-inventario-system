"use client"

import { useState } from "react"
import { MoreVertical, Edit, Trash2 } from "lucide-react"

// Añadir una verificación adicional para asegurarnos de que users siempre sea un array
function UserTable({ users = [], onEdit, onDelete }) {
  const [openMenuId, setOpenMenuId] = useState(null)

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  // Asegurarnos de que users sea un array antes de intentar acceder a sus propiedades
  const safeUsers = Array.isArray(users) ? users : []

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Último Acceso
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {safeUsers.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                No se encontraron usuarios
              </td>
            </tr>
          ) : (
            safeUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(user.id)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                    {openMenuId === user.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                        <button
                          onClick={() => {
                            onEdit(user)
                            setOpenMenuId(null)
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            onDelete(user)
                            setOpenMenuId(null)
                          }}
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
