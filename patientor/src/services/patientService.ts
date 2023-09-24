import patientData from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
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

const addEntry = (newEntry: NewEntry, patient: Patient): Entry => {
  const entry: Entry = {
    id: uuid(),
    ...newEntry,
  };

  patient.entries.push(entry);

  return entry;
};

const findById = (id: string): Patient | undefined => {
  return patientData.find((p) => p.id === id);
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry,
};
