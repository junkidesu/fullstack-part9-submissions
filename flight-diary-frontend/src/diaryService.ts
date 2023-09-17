import axios from "axios";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";

const baseUrl = "http://localhost:3001/api/diaries";

export const getAllEntries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then((response) => response.data);
};

export const createEntry = (newEntry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, newEntry)
    .then((response) => response.data);
};
