import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

// Importando models
import Device from "./models/Device.js";


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
let devices = db.devices || [];

// Rota GET 
app.get("/devices", (req, res) => res.json(devices));


// Rota POST
app.post("/devices", (req, res) => {
    const newDevice = new Device({
        id: devices.length + 1,
        ...req.body,
    });
    devices.push(newDevice);
    saveDB();
    res.status(201).json(newDevice);
});

// Rota PUT
app.put("/devices/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = devices.findIndex((d) => d.id === id);
    if (index === -1) return res.status(404).json({ error: "Device not found" });

    const updated = new Device({ ...devices[index], ...req.body });
    devices[index] = updated;
    saveDB();
    res.json(updated);
});


// Rota DELETE
app.delete("/devices/:id", (req, res) => {
    const id = parseInt(req.params.id);
    devices = devices.filter((d) => d.id !== id);
    saveDB();
    res.status(204).send();
});