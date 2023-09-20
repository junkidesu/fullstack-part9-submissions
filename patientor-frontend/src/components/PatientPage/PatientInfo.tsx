import {
  Male,
  Female,
} from "@mui/icons-material";
import {
  Patient,
  Gender,
  Diagnosis,
} from "../../types";
import EntryDetails from "./EntryDetails";

interface Props {
  patient: Patient;
  diagnoses: Diagnosis[];
}

const PatientInfo = ({ patient, diagnoses }: Props) => {
  return (
    <div>
      <h2>
        {patient.name + " "}
        {patient.gender === Gender.Male ? <Male /> : <Female />}
      </h2>

      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

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
