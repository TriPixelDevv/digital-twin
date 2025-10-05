export default class Vital {
  constructor({ id, patientId, type, value, unit, timestamp }) {
    this.id = id;
    this.patientId = patientId; 
    this.type = type;           
    this.value = value;         
    this.unit = unit;          
    this.timestamp = timestamp; 
  }
}
