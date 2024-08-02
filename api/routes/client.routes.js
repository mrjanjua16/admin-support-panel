import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createClient, getClients } from "../controllers/client.controller.js";

const router = express.Router();

router.post("/create-client", verifyToken, createClient);
router.get("/get-clients", verifyToken, getClients);

export default router;