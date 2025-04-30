import { Router } from "express";
const router = Router();
import bcrypt from "bcryptjs";
const { compare, hash } = bcrypt;
import jwt from "jsonwebtoken";
const { sign } = jwt;
import { PrismaClient } from "@prisma/client";
import { verifyToken, checkAdminRole } from "../middlewares/auth.js";

const prisma = new PrismaClient();

// Ruta de Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

router.post("/register", verifyToken, checkAdminRole, async (req, res) => {
  const { email, password, name, role = "employee" } = req.body; // Por defecto crea empleados
  try {
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role },
    });
    res.status(201).json({
      message: "Usuario creado",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

router.get("/validate", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
});

// Ruta para listar usuarios (solo admin)
router.get("/users", verifyToken, checkAdminRole, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true }, // Excluye el password
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

// Actualizar un usuario (solo admin)
router.put("/users/:id", verifyToken, checkAdminRole, async (req, res) => {
  const { id } = req.params;
  const { email, name, role, password } = req.body;

  try {
    const updateData = { email, name, role };

    // Si se envía contraseña, se encripta
    if (password) {
      const hashedPassword = await hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: { id: true, name: true, email: true, role: true },
    });

    res.json({ message: "Usuario actualizado", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
});

// Eliminar un usuario (solo admin)
router.delete("/users/:id", verifyToken, checkAdminRole, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
});

export default router;
