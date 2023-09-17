import { useState, useEffect } from "react";
import { getAllEntries, createEntry } from "./diaryService";
import {
  NonSensitiveDiaryEntry,
  DiaryItemProps,
  NewDiaryEntry,
  Visibility,
  Weather,
} from "./types";
import { isAxiosError } from "axios";

const DiaryItem = (props: DiaryItemProps) => {
  return (
    <div>
      <h4>{props.entry.date}</h4>

      <div>visibility: {props.entry.visibility}</div>

      <div>weather: {props.entry.weather}</div>
    </div>
  );
};

interface ErrorMessageProps {
  message: string | undefined;
}
const ErrorMessage = (props: ErrorMessageProps) => {
  const style: React.CSSProperties = {
    color: "red",
  };

  if (!props.message) {
    return null;
  }

  return <p style={style}>{props.message}</p>;
};

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    getAllEntries().then((entries) => setEntries(entries));
  }, []);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry = {
      date,
      visibility,
      comment,
      weather,
    } as NewDiaryEntry;

    createEntry(newEntry)
      .then((addedEntry) => {
        setEntries(
          entries.concat({
            id: addedEntry.id,
            date: addedEntry.date,
            visibility: addedEntry.visibility,
            weather: addedEntry.weather,
          })
        );

        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          setMessage(error.response?.data as string);
          setTimeout(() => {
            setMessage(undefined);
          }, 2000);
        }
      });
  };

  return (
    <div>
      <h3>Add new entry</h3>

      <ErrorMessage message={message} />

      <form onSubmit={addEntry}>
        <div>
          date{" "}
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div>
          visibility{" "}
          {Object.values(Visibility).map((v) => (
            <span key={v}>
              <input
                type="radio"
                id={v}
                name="visibility"
                checked={visibility === v}
                onChange={() => setVisibility(v)}
                required
              />
              <label htmlFor={v}>{v}</label>
            </span>
          ))}
        </div>

        <div>
          weather{" "}
          {Object.values(Weather).map((w) => (
            <span key={w}>
              <input
                type="radio"
                id={w}
                name="weather"
                checked={weather === w}
                onChange={() => setWeather(w)}
                required
              />
              <label htmlFor={w}>{w}</label>
            </span>
          ))}
        </div>

        <div>
          comment{" "}
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
