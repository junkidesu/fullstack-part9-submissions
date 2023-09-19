import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../../types";
import PatientInfo from "./PatientInfo";
import patientService from "../../services/patients";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
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
      <PatientInfo patient={patient} diagnoses={diagnoses} />
    </div>
  );
};

export default PatientPage;
