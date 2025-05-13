import express from "express";

// Importar todas as rotas
import authRouter from "./authRoutes.js";

import authMiddleware from "../middleware/authMiddleware.js";

import gameRouter from "./game.routes.js"

const router = express.Router();

// Rotas públicas
router.use("/auth", authRouter);
router.use("/games", gameRouter)

// Rotas protegidas
router.use(authMiddleware);

export default router;