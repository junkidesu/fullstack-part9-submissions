import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import PatientInfo from "./PatientInfo";
import patientService from "../../services/patients";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async (id: string) => {
        const patient = await patientService.getOneById(id);
        setPatient(patient);
    }

    if (id) {
        fetchPatient(id);
    }
  }, [id]);

  if (!patient) return <div>loading...</div>;

  return (
    <div>
      <PatientInfo patient={patient} />
    </div>
  );
};

export default PatientPage;
