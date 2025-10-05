import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

// Importando models
import Simulation from "./models/Simulation.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Caminho do banco JSON (mock)
const dbPath = path.resolve("./db.json");

// Função auxiliar para ler o arquivo
function loadDB() {
    const rawData = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(rawData);
}

// Função auxiliar para salvar no JSON
function saveDB() {
    fs.writeFileSync(
        dbPath,
        JSON.stringify({ patients, devices, vitals, simulations }, null, 2)
    );
}

// Carregando dados do db.json
const db = loadDB();
let simulations = db.simulations || [];

// ---------- GET ----------
app.get("/simulations", (req, res) => res.json(simulations));

// ---------- POST ----------

app.post("/simulations", (req, res) => {
    const newSimulation = new Simulation({
        id: simulations.length + 1,
        ...req.body,
    });
    simulations.push(newSimulation);
    saveDB();
    res.status(201).json(newSimulation);
});

// ---------- PUT ----------

app.put("/simulations/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = simulations.findIndex((s) => s.id === id);
    if (index === -1) return res.status(404).json({ error: "Simulation not found" });

    const updated = new Simulation({ ...simulations[index], ...req.body });
    simulations[index] = updated;
    saveDB();
    res.json(updated);
});

// ---------- DELETE ----------

app.delete("/simulations/:id", (req, res) => {
    const id = parseInt(req.params.id);
    simulations = simulations.filter((s) => s.id !== id);
    saveDB();
    res.status(204).send();
});