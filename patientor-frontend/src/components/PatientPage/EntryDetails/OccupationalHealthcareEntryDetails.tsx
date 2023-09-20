import { Diagnosis, OccupationalHealthcareEntry } from "../../../types";
import { Work } from "@mui/icons-material";

interface OccupationalHealthcareProps {
  entry: OccupationalHealthcareEntry;
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

const OccupationalHealthcareEntryDetails = ({
  entry,
  diagnoses,
}: OccupationalHealthcareProps) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <Work /> <i>{entry.employerName}</i>
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
        {entry.sickLeave
          ? `from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`
          : null}
      </div>

      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
