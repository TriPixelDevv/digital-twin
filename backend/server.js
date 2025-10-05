import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

// Importando models
import Device from "./models/Device.js";
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
let patients = db.patients || [];
let devices = db.devices || [];
let vitals = db.vitals || [];
let simulations = db.simulations || [];

// ====================== ROTAS ======================

// Rota inicial
app.get("/", (req, res) => res.send("API is running..."));



// ====================== Iniciando o server ======================
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
