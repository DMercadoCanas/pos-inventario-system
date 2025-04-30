import cors from "cors";
import express, { json } from "express";
import authRoutes from "./routes/auth.routes.js";
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware CORS
app.use(
  cors({
    origin: [
      "https://pos-inventario-system-frontend.vercel.app",
      "http://localhost:5173", // Para desarrollo local
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  console.log("Body recibido:", req.body);
  next();
});

// Rutas
app.use("/api", authRoutes);

export default app;
