export const calculateBmi = (heigth: number, weight: number): string => {
  const bmi = weight / Math.pow(heigth / 100, 2);

  if (bmi < 18.5) return "Underweight";
  if (bmi <= 24.9) return "Normal (healthy weight)";
  if (bmi <= 29.9) return "Overweight";
  else return "Obese";
};
