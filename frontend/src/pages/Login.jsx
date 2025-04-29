import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login({ setAuthState }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Limpiar mensaje de error cuando el usuario comienza a escribir
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log("Enviando datos:", {
        email: formData.username,
        password: formData.password,
      })

      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password,
        }),
      })

      const data = await response.json()
      console.log("Respuesta del servidor:", data)

      if (response.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))

        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: data.user,
        })

        navigate("/dashboard")
      } else {
        setError(data.message || "Credenciales incorrectas")
      }
    } catch (err) {
      console.error("Error completo:", err)
      setError("Error de conexión con el servidor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#5c4b44]">POS + Inventario</h1>
          <p className="mt-1 text-sm text-gray-500">Accede a tu cuenta para continuar</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#5c4b44] mb-2">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 p-3 text-sm text-gray-800 transition focus:border-[#5c4b44] focus:outline-none focus:ring-1 focus:ring-[#5c4b44]"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#5c4b44] mb-2">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 p-3 text-sm text-gray-800 transition focus:border-[#5c4b44] focus:outline-none focus:ring-1 focus:ring-[#5c4b44]"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-md bg-[#5c4b44] py-3 text-base font-medium text-white transition hover:bg-[#4a3c37] focus:outline-none focus:ring-2 focus:ring-[#5c4b44] focus:ring-offset-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative">
            <span className="bg-white px-4 text-sm text-gray-500">o</span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            ¿No tienes una cuenta?{" "}
            <a href="#" className="font-medium text-[#5c4b44] hover:underline">
              Registrarse
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
