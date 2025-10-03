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

// extrair dados do JSON
const patients = db.patients || [];
const devices = db.devices || [];
const vitals = db.vitals || [];
const simulations = db.simulations || [];

app.get("/", (req, res) => {
    res.send("API is running...");
});

// rotas de teste
app.get("/patients", (req, res) => res.json(patients));
app.get("/devices", (req, res) => res.json(devices));
app.get("/vitals", (req, res) => res.json(vitals));
app.get("/simulations", (req, res) => res.json(simulations));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
