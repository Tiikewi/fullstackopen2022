import patientData from "../../data/patients.json";
import { NewPatientEntry, PatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const patients: Omit<PatientEntry, "ssn">[] = patientData;
console.log("patients:", patients);

const getEntries = (): Omit<PatientEntry, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();

  const newPatient = {
    id,
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getEntries, addPatient };
