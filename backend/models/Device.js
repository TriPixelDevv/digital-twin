export default class Device {
  constructor({ id, type, model, patientId, status }) {
    this.id = id;
    this.type = type;
    this.model = model;
    this.patientId = patientId; 
    this.status = status;       
  }
}
