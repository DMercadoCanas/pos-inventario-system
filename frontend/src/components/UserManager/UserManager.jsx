import { useState, useEffect } from "react"
import { Search, UserPlus, Shield, Eye, EyeOff } from "lucide-react"
import UserTable from "./UserTable"
import AddUserModal from "./AddUserModal"
import EditUserModal from "./EditUserModal"
import DeleteConfirmModal from "./DeleteConfirmModal"

function UserManager() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Función para obtener todos los usuarios
  const fetchUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("No se pudieron cargar los usuarios")
      }

      const data = await response.json()
      setUsers(data)
      setFilteredUsers(data)
    } catch (err) {
      console.error("Error al cargar usuarios:", err)
      setError("Error al cargar usuarios. Verifica tu conexión o permisos.")
    } finally {
      setIsLoading(false)
    }
  }

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers()
  }, [])

  // Filtrar usuarios basado en el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredUsers(filtered)
    }
  }, [searchTerm, users])

  // Función para añadir un nuevo usuario
  const handleAddUser = async (newUser) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role.toLowerCase(), // Convertir a minúsculas para coincidir con el backend
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al crear usuario")
      }

      const data = await response.json()
      // Actualizar la lista de usuarios
      fetchUsers()
      setShowAddModal(false)
    } catch (err) {
      console.error("Error al añadir usuario:", err)
      alert(err.message)
    }
  }

  // Función para editar un usuario existente
  const handleEditUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/api/users/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role.toLowerCase(),
          ...(updatedUser.password && { password: updatedUser.password }),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al actualizar usuario")
      }

      // Actualizar la lista de usuarios
      fetchUsers()
      setShowEditModal(false)
      setCurrentUser(null)
    } catch (err) {
      console.error("Error al editar usuario:", err)
      alert(err.message)
    }
  }

  // Función para eliminar un usuario
  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al eliminar usuario")
      }

      // Actualizar la lista de usuarios
      fetchUsers()
      setShowDeleteModal(false)
      setCurrentUser(null)
    } catch (err) {
      console.error("Error al eliminar usuario:", err)
      alert(err.message)
    }
  }

  const openEditModal = (user) => {
    setCurrentUser(user)
    setShowEditModal(true)
  }

  const openDeleteModal = (user) => {
    setCurrentUser(user)
    setShowDeleteModal(true)
  }

  // Mapear roles del backend a formato legible
  const formatRole = (role) => {
    const roleMap = {
      admin: "Administrador",
      employee: "Empleado",
    }
    return roleMap[role] || role
  }

  // Preparar usuarios para mostrar en la UI
  const prepareUsersForUI = (users) => {
    return users.map((user) => ({
      ...user,
      role: formatRole(user.role),
      status: "Activo", // Por defecto todos activos, puedes ajustar según tu lógica
      lastLogin: "No disponible", // Puedes implementar tracking de último login si lo deseas
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=5c4b44&color=fff`,
    }))
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#5c4b44]">Gestor de Usuarios</h1>
        <p className="text-gray-600">Administra los usuarios que pueden acceder al sistema</p>
      </div>

      {/* Search and Add User */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#5c4b44] focus:border-[#5c4b44]"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#5c4b44] text-white rounded-md hover:bg-[#4a3c37] transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          <span>Añadir Usuario</span>
        </button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Usuarios</p>
              <h3 className="text-2xl font-bold text-gray-800">{users.length}</h3>
            </div>
            <div className="bg-[#f8f5f2] p-3 rounded-full">
              <Shield className="h-5 w-5 text-[#5c4b44]" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Administradores</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {users.filter((user) => user.role === "admin").length}
              </h3>
            </div>
            <div className="bg-[#f8f5f2] p-3 rounded-full">
              <Eye className="h-5 w-5 text-[#5c4b44]" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Empleados</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {users.filter((user) => user.role === "employee").length}
              </h3>
            </div>
            <div className="bg-[#f8f5f2] p-3 rounded-full">
              <EyeOff className="h-5 w-5 text-[#5c4b44]" />
            </div>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5c4b44] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando usuarios...</p>
        </div>
      ) : (
        /* Users Table */
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <UserTable users={prepareUsersForUI(filteredUsers)} onEdit={openEditModal} onDelete={openDeleteModal} />
        </div>
      )}

      {/* Modals */}
      {showAddModal && <AddUserModal onClose={() => setShowAddModal(false)} onAddUser={handleAddUser} />}

      {showEditModal && currentUser && (
        <EditUserModal
          user={prepareUsersForUI([currentUser])[0]}
          onClose={() => {
            setShowEditModal(false)
            setCurrentUser(null)
          }}
          onEditUser={handleEditUser}
        />
      )}

      {showDeleteModal && currentUser && (
        <DeleteConfirmModal
          user={prepareUsersForUI([currentUser])[0]}
          onClose={() => {
            setShowDeleteModal(false)
            setCurrentUser(null)
          }}
          onDeleteUser={handleDeleteUser}
        />
      )}
    </>
  )
}

export default UserManager
