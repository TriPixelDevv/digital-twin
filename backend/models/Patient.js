export default class Patient {
  constructor({ id, name, age, gender, condition, digitalTwinId }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.condition = condition;
    this.digitalTwinId = digitalTwinId;
  }
}
