import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import WorkIcon from "@mui/icons-material/Work";
import HospitalIcon from "@mui/icons-material/LocalHospital";
import HeartIcon from "@mui/icons-material/Favorite";
import {
  Patient,
  Gender,
  Entry,
  Diagnosis,
  HealthCheckEntry,
  HealthCheckRating,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from "../../types";

interface Props {
  patient: Patient;
  diagnoses: Diagnosis[];
}

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

interface HealthCheckProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

interface OccupationalHealthcareProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

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

const colors = ["green", "yellow", "orange", "red"];

const HealthCheckEntryDetails = ({ entry, diagnoses }: HealthCheckProps) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <HealthAndSafetyIcon />
      </div>

      <div>
        <HeartIcon style={{ color: colors[entry.healthCheckRating] }} />
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

const OccupationalHealthcareEntryDetails = ({
  entry,
  diagnoses,
}: OccupationalHealthcareProps) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <WorkIcon /> <i>{entry.employerName}</i>
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

const HospitalEntryDetails = ({ entry, diagnoses }: HospitalProps) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <HospitalIcon />
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

const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryDetails
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return (
        // <div>
        //   {entry.date} <i>{entry.description}</i>
        //   <ul>
        //     {entry.diagnosisCodes?.map((c) => (
        //       <li key={c}>
        //         {c} {diagnoses.find((d) => d.code === c)?.name}
        //       </li>
        //     ))}
        //   </ul>
        // </div>
        null
      );
  }
};

const PatientInfo = ({ patient, diagnoses }: Props) => {
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
          <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />
        ))}
      </div>
    </div>
  );
};

export default PatientInfo;
