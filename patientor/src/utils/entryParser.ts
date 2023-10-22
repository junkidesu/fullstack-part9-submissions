/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  NewEntry,
  Diagnose,
  HealthCheckRating,
  Discharge,
  SickLeave,
} from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: unknown, what: string): string => {
  if (!isString(text)) throw new Error(`Invalid value of ${what}: ${text}`);

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("invalid date: " + date);
  }

  return date;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
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

const parseSickLeave = (object: unknown): SickLeave | undefined => {
  if (!object || typeof object !== "object" || !("sickLeave" in object))
    return undefined;

  const sickLeave = object.sickLeave;
  if (!sickLeave || typeof sickLeave !== "object")
    throw new Error("Invalid sickLeave");
  if (
    !("startDate" in sickLeave) ||
    !isString(sickLeave.startDate) ||
    !isDate(sickLeave.startDate)
  )
    throw new Error("Invalid sick leave: startDate missing or invalid");
  if (
    !("endDate" in sickLeave) ||
    !isString(sickLeave.endDate) ||
    !isDate(sickLeave.endDate)
  )
    throw new Error("Invalid sick leave: endDate missing or invalid");

  return {
    startDate: sickLeave.startDate,
    endDate: sickLeave.endDate,
  };
};

const parseDischarge = (object: object): Discharge | undefined => {
  if (!("discharge" in object) || typeof object.discharge !== "object")
    return undefined;

  const discharge = object.discharge;

  if (!discharge || typeof discharge !== "object")
    throw new Error("Invalid discharge");
  if (
    !("date" in discharge) ||
    !isString(discharge.date) ||
    !isDate(discharge.date)
  )
    throw new Error("discharge date missing or invalid");
  if (!("criteria" in discharge) || !isString(discharge.criteria))
    throw new Error("discharge criteria missing or invalid");

  return {
    date: discharge.date,
    criteria: discharge.criteria,
  };
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Invalid or missing data");
  }

  if (!("description" in object)) throw new Error("Description missing");
  if (!("date" in object)) throw new Error("Date missing");
  if (!("specialist" in object)) throw new Error("Specialist missing");

  const base = {
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  if (object.type === "HealthCheck") {
    if (!("healthCheckRating" in object))
      throw new Error("Health check rating missing");

    return {
      ...base,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      type: "HealthCheck",
    };
  }

  if (object.type === "OccupationalHealthcare") {
    if (!("employerName" in object)) throw new Error("Employer name missing");

    return {
      ...base,
      employerName: parseString(object.employerName, "employerName"),
      sickLeave: parseSickLeave(object),
      type: "OccupationalHealthcare",
    };
  }

  if (object.type === "Hospital") {
    if (!("discharge" in object)) throw new Error("Discharge missing");

    return {
      ...base,
      discharge: parseDischarge(object),
      type: "Hospital",
    };
  }

  throw new Error("Invalid type");
};
