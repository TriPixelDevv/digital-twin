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

// coleções em memória
let patients = db.patients || [];
let devices = db.devices || [];
let vitals = db.vitals || [];
let simulations = db.simulations || [];

// rota de teste
app.get("/", (req, res) => res.send("API is running..."));

// --------------------- GET ---------------------
app.get("/patients", (req, res) => res.json(patients));
app.get("/devices", (req, res) => res.json(devices));
app.get("/vitals", (req, res) => res.json(vitals));
app.get("/simulations", (req, res) => res.json(simulations));

// --------------------- POST ---------------------
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

// --------------------- PUT ---------------------
app.put("/patients/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = patients.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ error: "Patient not found" });
    patients[index] = { ...patients[index], ...req.body };
    res.json(patients[index]);
});
app.put("/devices/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = devices.findIndex(d => d.id === id);
    if (index === -1) return res.status(404).json({ error: "Device not found" });
    devices[index] = { ...devices[index], ...req.body };
    res.json(devices[index]);
});
app.put("/vitals/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = vitals.findIndex(v => v.id === id);
    if (index === -1) return res.status(404).json({ error: "Vital not found" });
    vitals[index] = { ...vitals[index], ...req.body };
    res.json(vitals[index]);
});
app.put("/simulations/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = simulations.findIndex(s => s.id === id);
    if (index === -1) return res.status(404).json({ error: "Simulation not found" });
    simulations[index] = { ...simulations[index], ...req.body };
    res.json(simulations[index]);
});

// --------------------- DELETE ---------------------
app.delete("/patients/:id", (req, res) => {
    const id = parseInt(req.params.id);
    patients = patients.filter(p => p.id !== id);
    res.status(204).send();
});
app.delete("/devices/:id", (req, res) => {
    const id = parseInt(req.params.id);
    devices = devices.filter(d => d.id !== id);
    res.status(204).send();
});
app.delete("/vitals/:id", (req, res) => {
    const id = parseInt(req.params.id);
    vitals = vitals.filter(v => v.id !== id);
    res.status(204).send();
});
app.delete("/simulations/:id", (req, res) => {
    const id = parseInt(req.params.id);
    simulations = simulations.filter(s => s.id !== id);
    res.status(204).send();
});

// --------------------- Iniciar servidor ---------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
