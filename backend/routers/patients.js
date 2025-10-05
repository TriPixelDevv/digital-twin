import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

// Importando models
import Patient from "./models/Patient.js";


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
let patients = db.patients || [];


// Rota POST
app.post("/patients", (req, res) => {
    const newPatient = new Patient({
        id: patients.length + 1,
        ...req.body,
    });
    patients.push(newPatient);
    saveDB();
    res.status(201).json(newPatient);
});

// Rota GET
app.get("/patients", (req, res) => res.json(patients));

// Rota PUT
app.put("/patients/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = patients.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Patient not found" });

    const updated = new Patient({ ...patients[index], ...req.body });
    patients[index] = updated;
    saveDB();
    res.json(updated);
});

// Delete 
app.delete("/patients/:id", (req, res) => {
    const id = parseInt(req.params.id);
    patients = patients.filter((p) => p.id !== id);
    saveDB();
    res.status(204).send();
});