"use client"

import { X } from "lucide-react"

function DeleteConfirmModal({ user, onClose, onDeleteUser }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#5c4b44]">Eliminar Usuario</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-4">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="h-12 w-12 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  ¿Está seguro que desea eliminar este usuario? Esta acción no se puede deshacer.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => onDeleteUser(user.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
            >
              Eliminar Usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
