export default class Simulation {
  constructor({ id, patientId, scenario, parameters, result, createdAt }) {
    this.id = id;
    this.patientId = patientId;
    this.scenario = scenario;     
    this.parameters = parameters; 
    this.result = result;         
    this.createdAt = createdAt || new Date().toISOString();
  }
}
