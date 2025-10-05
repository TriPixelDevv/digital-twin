import express from "express";
import fs from "fs";
import path from "path";
import Simulation from "../models/Simulation.js";

const router = express.Router();

// Caminho do banco JSON (mock)
const dbPath = path.resolve("./db.json");

// Função auxiliar para ler o arquivo
function loadDB() {
  const rawData = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(rawData);
}

// Função auxiliar para salvar no JSON
function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// ---------- GET ----------
router.get("/", (req, res) => {
  const db = loadDB();
  const simulations = db.simulations || [];
  res.json(simulations);
});

// ---------- POST ----------
router.post("/", (req, res) => {
  const db = loadDB();
  const simulations = db.simulations || [];

  const newSimulation = new Simulation({
    id: simulations.length + 1,
    ...req.body,
  });

  simulations.push(newSimulation);
  db.simulations = simulations;
  saveDB(db);

  res.status(201).json(newSimulation);
});

// ---------- PUT ----------
router.put("/:id", (req, res) => {
  const db = loadDB();
  const simulations = db.simulations || [];

  const id = parseInt(req.params.id);
  const index = simulations.findIndex((s) => s.id === id);

  if (index === -1) return res.status(404).json({ error: "Simulation not found" });

  const updated = new Simulation({ ...simulations[index], ...req.body });
  simulations[index] = updated;

  db.simulations = simulations;
  saveDB(db);

  res.json(updated);
});

// ---------- DELETE ----------
router.delete("/:id", (req, res) => {
  const db = loadDB();
  let simulations = db.simulations || [];

  const id = parseInt(req.params.id);
  simulations = simulations.filter((s) => s.id !== id);

  db.simulations = simulations;
  saveDB(db);

  res.status(204).send();
});

export default router;
