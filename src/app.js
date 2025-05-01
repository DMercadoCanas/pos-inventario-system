import cors from "cors";
import express, { json } from "express";
import authRoutes from "./routes/auth.routes.js";
const app = express();

// Lista de dominios permitidos desde variables de entorno
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["https://pos-inventario-system-frontend.vercel.app"];

console.log("Orígenes permitidos:", allowedOrigins);

// Middleware para loggear todas las solicitudes
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${
      req.headers.origin || "No origin"
    }`
  );
  next();
});

// Configuración CORS con validación de origen
app.use(
  cors({
    origin: function (origin, callback) {
      // Para solicitudes que no tienen origen (como herramientas de desarrollo)
      if (!origin) return callback(null, true);

      // Verificar si el origen está en la lista de permitidos
      if (allowedOrigins.includes(origin)) {
        console.log("Origen permitido:", origin);
        return callback(null, true);
      }

      // Verificar si es un subdominio de preview de Vercel
      if (
        origin.match(
          /https:\/\/pos-inventario-system-frontend-.*\.vercel\.app$/
        )
      ) {
        console.log("Origen de preview permitido:", origin);
        return callback(null, true);
      }

      // Rechazar otros orígenes
      console.log("Origen bloqueado por CORS:", origin);
      callback(new Error("No permitido por CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permite enviar cookies entre dominios si es necesario
    maxAge: 86400, // Caché de respuestas preflight por 24 horas (en segundos)
  })
);

// Resto de tu configuración de middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Body recibido:", req.body);
  next();
});

// Rutas
app.use("/api", authRoutes);

export default app;
