import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Patient, Gender, Entry, Diagnosis } from "../../types";

interface PatientInfoProps {
  patient: Patient;
  diagnoses: Diagnosis[];
}

interface EntryItemProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryItem = ({ entry, diagnoses }: EntryItemProps) => {
  return (
    <div>
      {entry.date} <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map((c) => (
          <li key={c}>
            {c} {diagnoses.find((d) => d.code === c)?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PatientInfo = ({ patient, diagnoses }: PatientInfoProps) => {
  return (
    <div>
      <h2>
        {patient.name + " "}
        {patient.gender === Gender.Male ? <MaleIcon /> : <FemaleIcon />}
      </h2>

      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      <h3>entries</h3>

      <div>
        {patient.entries.map((e) => (
          <EntryItem key={e.id} entry={e} diagnoses={diagnoses} />
        ))}
      </div>
    </div>
  );
};

export default PatientInfo;
