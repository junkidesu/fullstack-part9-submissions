import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Patient, Gender, Entry } from "../../types";

interface PatientInfoProps {
  patient: Patient;
}

interface EntryItemProps {
  entry: Entry;
}

const EntryItem = ({ entry }: EntryItemProps) => {
  return (
    <div>
      {entry.date} <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

const PatientInfo = ({ patient }: PatientInfoProps) => {
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
          <EntryItem key={e.id} entry={e} />
        ))}
      </div>
    </div>
  );
};

export default PatientInfo;
