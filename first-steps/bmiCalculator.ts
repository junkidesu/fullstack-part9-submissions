// interface BMIValues {
//   height: number;
//   weight: number;
// }

// const parseBMIValues = (args: string[]): BMIValues => {
//   if (args.length > 2) throw new Error("Too many arguments");
//   if (args.length < 2) throw new Error("Too few arguments");

//   const height = Number(args[0]);
//   const weight = Number(args[1]);

//   if (isNaN(height) || isNaN(weight)) {
//     throw new Error("Provided values were not numbers!");
//   } else {
//     if (height === 0) {
//       throw new Error("Height cannot be zero!");
//     }

//     return { height, weight };
//   }
// };

export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = (10000 * weight) / (height * height);

  if (bmi < 18.5) return "Underweight";
  else if (bmi >= 18.5 && bmi <= 22.9) return "Normal weight";
  else if (bmi >= 23.0 && bmi <= 27.4) return "Overweight";
  else return "Obese";
};

// Exercise 3 solution
// try {
//   const { height, weight } = parseBMIValues(process.argv.slice(2));

//   console.log(calculateBmi(height, weight));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong: ";

//   if (error instanceof Error) {
//     errorMessage += error.message;
//   }

//   console.log(errorMessage);
// }
