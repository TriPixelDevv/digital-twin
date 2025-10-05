import express from "express";
import fs from "fs";
import path from "path";
import Vital from "../models/Vital.js";

const router = express.Router();

// Caminho do banco JSON (mock)
const dbPath = path.resolve("./db.json");

// Função auxiliar para ler o arquivo
function loadDB() {
  const rawData = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(rawData);
}

// Função auxiliar para salvar no JSON
function saveDB(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

// ====================== GET ======================
router.get("/", (req, res) => {
  const db = loadDB();
  res.json(db.vitals || []);
});

// ====================== POST ======================
router.post("/", (req, res) => {
  const db = loadDB();
  const vitals = db.vitals || [];

  const newVital = new Vital({
    id: vitals.length + 1,
    ...req.body,
  });

  vitals.push(newVital);
  db.vitals = vitals;
  saveDB(db);

  res.status(201).json(newVital);
});

// ====================== PUT ======================
router.put("/:id", (req, res) => {
  const db = loadDB();
  const vitals = db.vitals || [];
  const id = parseInt(req.params.id);

  const index = vitals.findIndex((v) => v.id === id);
  if (index === -1) return res.status(404).json({ error: "Vital not found" });

  vitals[index] = new Vital({ ...vitals[index], ...req.body });
  db.vitals = vitals;
  saveDB(db);

  res.json(vitals[index]);
});

// ====================== DELETE ======================
router.delete("/:id", (req, res) => {
  const db = loadDB();
  let vitals = db.vitals || [];
  const id = parseInt(req.params.id);

  const beforeCount = vitals.length;
  vitals = vitals.filter((v) => v.id !== id);

  if (vitals.length === beforeCount) {
    return res.status(404).json({ error: "Vital not found" });
  }

  db.vitals = vitals;
  saveDB(db);
  res.status(204).send();
});

export default router;
