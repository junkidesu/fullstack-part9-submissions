import { useState, useEffect } from "react";
import axios from "axios";

enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

interface DiaryItemProps {
  entry: NonSensitiveDiaryEntry;
}

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

  useEffect(() => {
    axios
      .get<NonSensitiveDiaryEntry[]>("http://localhost:3001/api/diaries")
      .then((response) => setEntries(response.data));
  }, []);

  return (
    <div>
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
