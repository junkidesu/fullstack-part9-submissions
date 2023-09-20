import { HealthCheckEntry, Diagnosis } from "../../../types";
import { HealthAndSafety, Favorite } from "@mui/icons-material";

interface HealthCheckProps {
  entry: HealthCheckEntry;
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

const colors = ["green", "yellow", "orange", "red"];

const HealthCheckEntryDetails = ({ entry, diagnoses }: HealthCheckProps) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <HealthAndSafety />
      </div>

      <div>
        <Favorite style={{ color: colors[entry.healthCheckRating] }} />
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

      <div>diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HealthCheckEntryDetails;
