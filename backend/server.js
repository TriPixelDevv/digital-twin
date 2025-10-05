import express from "express";
import cors from "cors";
import patientsRouter from "./routes/patients.js";
import devicesRouter from "./routes/devices.js";
import vitalsRouter from "./routes/vitals.js";
import simulationsRouter from "./routes/simulations.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));

// Rotas
app.use("/patients", patientsRouter);
app.use("/devices", devicesRouter);
app.use("/vitals", vitalsRouter);
app.use("/simulations", simulationsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
