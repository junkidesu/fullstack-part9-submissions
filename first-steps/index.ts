import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight)))
    return res.status(400).json({ error: "malformatted parameters" });

  const bmi = calculateBmi(Number(height), Number(weight));

  return res.json({ height, weight, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises)
    return res.status(400).json({ error: 'parameters missing' });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (isNaN(Number(target)) || (daily_exercises as number[]).map(Number).some(isNaN))
    return res.status(400).json({ error: 'malformatted parameters' });

  return res.json(calculateExercises(Number(target), daily_exercises as number[]));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
