import express from "express";
import fs from "fs";
import path from "path";
import Device from "../models/Device.js";

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
  res.json(db.devices || []);
});

// ====================== POST ======================
router.post("/", (req, res) => {
  const db = loadDB();
  const devices = db.devices || [];

  const newDevice = new Device({
    id: devices.length + 1,
    ...req.body,
  });

  devices.push(newDevice);
  db.devices = devices;
  saveDB(db);

  res.status(201).json(newDevice);
});

// ====================== PUT ======================
router.put("/:id", (req, res) => {
  const db = loadDB();
  const devices = db.devices || [];
  const id = parseInt(req.params.id);

  const index = devices.findIndex((d) => d.id === id);
  if (index === -1) return res.status(404).json({ error: "Device not found" });

  devices[index] = new Device({ ...devices[index], ...req.body });
  db.devices = devices;
  saveDB(db);

  res.json(devices[index]);
});

// ====================== DELETE ======================
router.delete("/:id", (req, res) => {
  const db = loadDB();
  let devices = db.devices || [];
  const id = parseInt(req.params.id);

  const beforeCount = devices.length;
  devices = devices.filter((d) => d.id !== id);

  if (devices.length === beforeCount) {
    return res.status(404).json({ error: "Device not found" });
  }

  db.devices = devices;
  saveDB(db);
  res.status(204).send();
});

export default router;
