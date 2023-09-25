import React, { useState } from "react";
import { Box, TextField, Button, ButtonGroup } from "@mui/material";
import { Male, Female } from "@mui/icons-material";
import {
  Entry,
  Patient,
  Gender,
  Diagnosis,
  EntryFormValues,
} from "../../types";
import EntryDetails from "./EntryDetails";
import patientService from "../../services/patients";

interface Props {
  patient: Patient;
  patients: Patient[];
  diagnoses: Diagnosis[];
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

interface NewEntryFormProps {
  onSubmit: (newEntry: EntryFormValues) => void;
}

const NewEntryForm = ({ onSubmit }: NewEntryFormProps) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes: diagnosisCodes.split(",").map((s) => s.trim()),
    });
  };

  return (
    <Box sx={{ border: "3px dotted black", padding: "5px 10px" }}>
      <h4>New HealthCheck Entry</h4>

      <form onSubmit={addEntry}>
        <TextField
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="standard"
          label="Description"
          sx={{ width: "100%" }}
          required
        />

        <TextField
          id="date"
          variant="standard"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          label="Date"
          sx={{ width: "100%" }}
          required
        />

        <TextField
          id="specialist"
          variant="standard"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          label="Specialist"
          sx={{ width: "100%" }}
          required
        />

        <TextField
          id="healthcheck-rating"
          variant="standard"
          type="number"
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(e.target.value)}
          label="Healthcheck Rating"
          sx={{ width: "100%" }}
          required
        />

        <TextField
          id="diagnosis-codes"
          variant="standard"
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
          label="Diagnose codes"
          sx={{ width: "100%" }}
          required
        />

        <ButtonGroup
          variant="contained"
          aria-label="medium button group"
          sx={{ marginTop: "10px" }}
        >
          <Button type="submit">Add</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

const PatientInfo = ({
  patient,
  patients,
  diagnoses,
  setPatient,
  setPatients,
}: Props) => {
  const submitEntry = async (newEntry: EntryFormValues) => {
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
