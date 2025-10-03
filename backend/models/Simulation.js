export default class Simulation {
  constructor({ id, patientId, scenario, parameters, result, createdAt }) {
    this.id = id;
    this.patientId = patientId;   // FK para Patient
    this.scenario = scenario;     // ex: "cardiac stress test"
    this.parameters = parameters; // objeto com variáveis de entrada
    this.result = result;         // objeto com saída
    this.createdAt = createdAt || new Date().toISOString();
  }
}
