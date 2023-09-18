import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Patient, Gender } from "../../types";

interface PatientInfoProps {
  patient: Patient;
}

const PatientInfo = ({ patient }: PatientInfoProps) => {
  return (
    <div>
      <h2>
        {patient.name + " "}
        {patient.gender === Gender.Male ? <MaleIcon /> : <FemaleIcon />}
      </h2>

      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientInfo;
