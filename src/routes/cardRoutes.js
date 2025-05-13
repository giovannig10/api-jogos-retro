import express from "express";
import CardController from "../controllers/cardController.js";

const cardRouter = express.Router();

// Rotas de Coleções
// GET /colecoes - Listar todas as Coleções
cardRouter.get("/", CardController.getAllCards);

// GET /personagens/:id - Obter uma Coleção pelo ID
cardRouter.get("/:id", CardController.getCardById);

// POST /personagens - Criar um novo Personagem
cardRouter.post("/", CardController.createCard);

// PUT /personagens/:id - Atualizar um Personagem
cardRouter.put("/:id", CardController.updateCard);

// DELETE /personagens/:id - Remover um Personagem
cardRouter.delete("/:id", CardController.deleteCard);

export default cardRouter;
