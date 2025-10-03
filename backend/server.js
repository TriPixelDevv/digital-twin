import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ler o db.json
const dbPath = path.resolve('./db.json');
const rawData = fs.readFileSync(dbPath, 'utf-8');
const db = JSON.parse(rawData);

let patients = db.patients || [];
let devices = db.devices || [];
let vitals = db.vitals || [];
let simulations = db.simulations || [];

// rota de teste
app.get("/", (req, res) => res.send("API is running..."));

// GET de todas as coleções
app.get("/patients", (req, res) => res.json(patients));
app.get("/devices", (req, res) => res.json(devices));
app.get("/vitals", (req, res) => res.json(vitals));
app.get("/simulations", (req, res) => res.json(simulations));

// POST para adicionar novos registros
app.post("/patients", (req, res) => {
    const newPatient = { id: patients.length + 1, ...req.body };
    patients.push(newPatient);
    res.status(201).json(newPatient);
});

app.post("/devices", (req, res) => {
    const newDevice = { id: devices.length + 1, ...req.body };
    devices.push(newDevice);
    res.status(201).json(newDevice);
});

app.post("/vitals", (req, res) => {
    const newVital = { id: vitals.length + 1, ...req.body };
    vitals.push(newVital);
    res.status(201).json(newVital);
});

app.post("/simulations", (req, res) => {
    const newSimulation = { id: simulations.length + 1, ...req.body };
    simulations.push(newSimulation);
    res.status(201).json(newSimulation);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
