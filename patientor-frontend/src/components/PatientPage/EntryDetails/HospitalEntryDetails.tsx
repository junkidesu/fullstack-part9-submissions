import { Diagnosis, HospitalEntry } from "../../../types";
import { LocalHospital } from "@mui/icons-material";

interface HospitalProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const entryStyle: React.CSSProperties = {
  borderWidth: "1px",
  borderColor: "black",
  borderStyle: "solid",
  padding: "15px 5px",
  marginBottom: "5px",
  borderRadius: "10px",
};

const HospitalEntryDetails = ({ entry, diagnoses }: HospitalProps) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <LocalHospital />
      </div>

      <div>
        <i>{entry.description}</i>
      </div>

      <ul>
        {entry.diagnosisCodes?.map((c) => (
          <li key={c}>
            {c} {diagnoses.find((d) => d.code === c)?.name}
          </li>
        ))}
      </ul>

      <div>
        discharge: {entry.discharge.date}. <i>{entry.discharge.criteria}</i>
      </div>

      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HospitalEntryDetails;
