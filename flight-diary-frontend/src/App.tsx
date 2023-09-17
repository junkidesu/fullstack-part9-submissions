import { useState, useEffect } from "react";
import axios from "axios";
import {
  NonSensitiveDiaryEntry,
  DiaryItemProps,
  NewDiaryEntry,
  DiaryEntry,
} from "./types";

const DiaryItem = (props: DiaryItemProps) => {
  return (
    <div>
      <h4>{props.entry.date}</h4>

      <div>visibility: {props.entry.visibility}</div>

      <div>weather: {props.entry.weather}</div>
    </div>
  );
};

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get<NonSensitiveDiaryEntry[]>("http://localhost:3001/api/diaries")
      .then((response) => setEntries(response.data));
  }, []);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry = {
      date,
      visibility,
      comment,
      weather,
    } as NewDiaryEntry;

    axios
      .post<DiaryEntry>("http://localhost:3001/api/diaries", newEntry)
      .then((response) => {
        const { id, date, visibility, weather } = response.data;
        setEntries(
          entries.concat({
            id,
            date,
            visibility,
            weather,
          })
        );

        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      });
  };

  return (
    <div>
      <h3>Add new entry</h3>

      <form onSubmit={addEntry}>
        <div>
          date{" "}
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility{" "}
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button>add</button>
      </form>

      <h3>Diary Entries</h3>

      <div>
        {entries.map((entry) => (
          <DiaryItem key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default App;
