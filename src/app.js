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
    origin: "https://pos-inventario-system-frontend.vercel.app",
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log("Body recibido:", req.body);
  next();
});

// Rutas
app.use("/api", authRoutes);

export default app;
