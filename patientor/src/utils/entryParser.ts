/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  NewEntry,
  Diagnose,
  BaseEntry,
  HealthCheckRating,
  Discharge,
} from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseType = (type: unknown) => {
  if (
    !isString(type) ||
    !["HealthCheck", "OccupationalHealthcare", "Hospital"].includes(type)
  ) {
    throw new Error("Invalid type: " + type);
  }

  return type;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Invalid description: " + description);
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("invalid date: " + date);
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Invalid specialist: " + specialist);
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

const toNewBaseEntry = (object: object): Omit<BaseEntry, "id"> => {
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object
  ) {
    return {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
    };
  } else {
    throw new Error("Some fields are missing or invalid");
  }
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(Number).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (isNaN(Number(rating)) || !isHealthCheckRating(Number(rating))) {
    throw new Error("Invalid health check rating: " + rating);
  }

  return Number(rating);
};

const toNewHealthCheckEntry = (object: object): NewEntry => {
  const baseEntry = toNewBaseEntry(object);

  if ("healthCheckRating" in object) {
    return {
      ...baseEntry,
      type: "HealthCheck",
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
  } else {
    throw new Error("Some data missing or invalid");
  }
};

const toNewOccupationalHealthcareEntry = (_object: object): NewEntry => {
  throw new Error("TODO");
};

const isDischarge = (discharge: object): discharge is Discharge => {
  return (
    "date" in discharge &&
    "criteria" in discharge &&
    isString(discharge.criteria) &&
    isString(discharge.date) &&
    isDate(discharge.date)
  );
};

const parseDischarge = (discharge: unknown) => {
  if (!discharge || typeof discharge !== "object" || !isDischarge(discharge)) {
    throw new Error("Invalid discharge");
  }

  return discharge;
};

const toNewHospitalEntry = (object: object): NewEntry => {
  const baseEntry = toNewBaseEntry(object);

  if ("discharge" in object) {
    return {
      ...baseEntry,
      type: "Hospital",
      discharge: parseDischarge(object.discharge),
    };
  } else {
    throw new Error("Some data missing or invalid");
  }
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (!("type" in object)) {
    throw new Error("Incorrect or missing data");
  } else {
    const type = parseType(object.type);

    switch (type) {
      case "HealthCheck":
        return toNewHealthCheckEntry(object);
      case "OccupationalHealthcare":
        return toNewOccupationalHealthcareEntry(object);
      case "Hospital":
        return toNewHospitalEntry(object);
      default:
        throw new Error();
    }
  }
};
