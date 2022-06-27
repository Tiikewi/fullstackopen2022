import { Gender, NewPatientEntry } from "./types";

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSSN(ssn),
  };

  return newEntry;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};
const parseDateOfBirth = (birth: unknown): string => {
  if (!birth || !isString(birth)) {
    throw new Error("Incorrect or missing birthdate");
  }

  return birth;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};
const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;
