export default class Vital {
  constructor({ id, patientId, type, value, unit, timestamp }) {
    this.id = id;
    this.patientId = patientId; // FK para Patient
    this.type = type;           // ex: "heart_rate"
    this.value = value;         // ex: 75
    this.unit = unit;           // ex: "bpm"
    this.timestamp = timestamp; // Date ou string ISO
  }
}
