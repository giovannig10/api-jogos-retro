import express from "express"

import recordController from "../controllers/record.controller.js";

const recordRouter = express.Router();

recordRouter.get("/", recordController.findAll);
recordRouter.post("/", recordController.create);

export default recordRouter;