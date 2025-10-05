import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

// Importando models
import Vital from "./models/Vital.js";

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
let vitals = db.vitals || [];

// Rota GET 
app.get("/vitals", (req, res) => res.json(vitals));

// Rota POST

app.post("/vitals", (req, res) => {
    const newVital = new Vital({
        id: vitals.length + 1,
        ...req.body,
    });
    vitals.push(newVital);
    saveDB();
    res.status(201).json(newVital);
});


// Rota PUT
app.put("/vitals/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = vitals.findIndex((v) => v.id === id);
    if (index === -1) return res.status(404).json({ error: "Vital not found" });

    const updated = new Vital({ ...vitals[index], ...req.body });
    vitals[index] = updated;
    saveDB();
    res.json(updated);
});

// Rota DELETE
app.delete("/vitals/:id", (req, res) => {
    const id = parseInt(req.params.id);
    vitals = vitals.filter((v) => v.id !== id);
    saveDB();
    res.status(204).send();
});