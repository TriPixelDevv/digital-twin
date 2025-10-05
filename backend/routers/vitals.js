import express from "express";
import { getAllVitals, createVital, updateVital, deleteVital } from "../controllers/vitalController.js";

const router = express.Router();

router.get("/", getAllVitals);
router.post("/", createVital);
router.put("/:id", updateVital);
router.delete("/:id", deleteVital);

export default router;
