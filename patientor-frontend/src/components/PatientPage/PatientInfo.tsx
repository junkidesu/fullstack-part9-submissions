import { Male, Female } from "@mui/icons-material";
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
