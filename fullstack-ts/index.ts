import express from "express";
const app = express();

// Enables req.body
app.use(express.json());

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: "malformatted parameters" });
  }

  res.json({
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if (isNaN(Number(target)) || daily_exercises.some(isNaN)) {
    res.status(400).json({ error: "malformed parameters" });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const calculatedExercises = calculateExercises(daily_exercises, target);

  res.json(calculatedExercises);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
