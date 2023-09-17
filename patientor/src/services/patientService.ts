import patientData from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient: Patient = {
    ...patient,
    id,
  };

  patientData.push(newPatient);

  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  return patientData.find((p) => p.id === id);
};

export default { getPatients, getNonSensitivePatients, addPatient, findById };
