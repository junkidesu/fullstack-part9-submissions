import { useState, useEffect } from "react";
import { getAllEntries, createEntry } from "./diaryService";
import { NonSensitiveDiaryEntry, DiaryItemProps, NewDiaryEntry } from "./types";

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

    createEntry(newEntry).then((addedEntry) => {
      setEntries(
        entries.concat({
          id: addedEntry.id,
          date: addedEntry.date,
          visibility: addedEntry.visibility,
          weather: addedEntry.weather,
        })
      );
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
          weather{" "}
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
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
