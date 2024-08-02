import express from "express";
import { createSpeciality, getSpecialities } from "../controllers/speciality.controller.js";

const router = express.Router();

router.post("/create-speciality", createSpeciality);
router.get("/get-specialities", getSpecialities);

export default router;