interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  exerciseDayList: number[],
  target: number
): Result => {
  const periodLength = exerciseDayList.length;
  const trainingDays = exerciseDayList.filter((day) => day !== 0).length;
  const success = exerciseDayList.every((dailyHours) => {
    return dailyHours >= target;
  });
  // calculate average
  const sum = exerciseDayList.reduce((a, b) => a + b, 0);
  const avg = sum / exerciseDayList.length;
  // rating
  let rating = 0;
  let ratingDesc = "";
  if (success) {
    rating = 3;
    ratingDesc = "goal achieved!";
  } else if (target - avg < 0.5) {
    rating = 2;
    ratingDesc = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDesc = "not so good work :(";
  }

  const resultObject = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDesc,
    target: target,
    average: avg,
  };

  return resultObject;
};
