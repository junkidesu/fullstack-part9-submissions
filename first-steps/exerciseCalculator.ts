interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// interface Arguments {
//   target: number;
//   hours: number[];
// }

// const parseArguments = (args: string[]): Arguments => {
//   if (args.length < 2) throw new Error("Too few arguments");

//   const target = Number(args[0]);
//   const hours = args.slice(1).map(Number);

//   if (isNaN(target) || hours.some(isNaN))
//     throw new Error("Provided values were not numbers!");

//   return { target, hours };
// };

export const calculateExercises = (target: number, hours: number[]): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((h: number) => h > 0).length;
  const total = hours.reduce((acc: number, curr: number) => acc + curr, 0);
  const average = total / periodLength;
  const success = average >= target;

  const difference = target - average;

  let rating, ratingDescription;
  if (difference <= 0.05) {
    rating = 3;
    ratingDescription = "Target goal reached";
  } else if (0.05 < difference && difference <= 0.1) {
    rating = 2;
    ratingDescription = "Target goal almost reached";
  } else {
    rating = 1;
    ratingDescription = "Target goal far from reached";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// try {
//   const { target, hours } = parseArguments(process.argv.slice(2));

//   console.log(calculateExercises(target, hours));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong: ";

//   if (error instanceof Error) {
//     errorMessage += error.message;
//   }

//   console.log(errorMessage);
// }
