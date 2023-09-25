import { useState } from "react";
import { Male, Female } from "@mui/icons-material";
import { Alert } from "@mui/material";
import {
  EntryFormValues,
  Entry,
  Patient,
  Gender,
  Diagnosis,
} from "../../types";
import EntryDetails from "./EntryDetails";
import NewEntryForm from "./NewEntryForm";
import patientService from "../../services/patients";
import { AxiosError } from "axios";

interface Props {
  patient: Patient;
  patients: Patient[];
  diagnoses: Diagnosis[];
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientInfo = ({
  patient,
  patients,
  diagnoses,
  setPatient,
  setPatients,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const submitEntry = async (newEntry: EntryFormValues) => {
    try {
      const addedEntry: Entry = await patientService.addEntry(
        patient.id,
        newEntry
      );

      const updatedPatient: Patient = {
        ...patient,
        entries: patient.entries.concat(addedEntry),
      };

      setPatient(updatedPatient);

      setPatients(
        patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
      );
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if ("response" in error && error.response) {
          if (
            typeof error.response.data === "object" &&
            "error" in error.response.data
          ) {
            setErrorMessage(error.response.data.error);
            setTimeout(() => {
              setErrorMessage(undefined);
            }, 2000);
          }
        }
      }
    }
  };

  return (
    <div>
      <h2>
        {patient.name + " "}
        {patient.gender === Gender.Male ? <Male /> : <Female />}
      </h2>

      <p>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>

      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

      <NewEntryForm onSubmit={submitEntry} />

      <h3>entries</h3>

      <div>
        {patient.entries.map((e) => (
          <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
        ))}
      </div>
    </div>
  );
};

export default PatientInfo;
