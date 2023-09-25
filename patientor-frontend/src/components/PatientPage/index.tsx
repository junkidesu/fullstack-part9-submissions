import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../../types";
import PatientInfo from "./PatientInfo";
import patientService from "../../services/patients";

interface PatientPageProps {
  diagnoses: Diagnosis[];
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientPage = ({
  diagnoses,
  patients,
  setPatients,
}: PatientPageProps) => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async (id: string) => {
      const patient = await patientService.getOneById(id);
      setPatient(patient);
    };

    if (id) {
      fetchPatient(id);
    }
  }, [id]);

  if (!patient) return <div>loading...</div>;

  return (
    <div>
      <PatientInfo
        patient={patient}
        patients={patients}
        diagnoses={diagnoses}
        setPatient={setPatient}
        setPatients={setPatients}
      />
    </div>
  );
};

export default PatientPage;
