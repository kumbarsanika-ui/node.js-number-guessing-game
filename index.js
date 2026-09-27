const { createInterface } = require("node:readline/promises");
const { stdin, stdout } = require("node:process");

const readline = createInterface({ input: stdin, output: stdout });
const target = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

async function play() {
  try {
    while (true) {
      const answer = await readline.question("Guess a number between 1 and 100: ");
      const guess = Number(answer);

      if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
        stdout.write("Please enter a whole number between 1 and 100.\n");
        continue;
      }

      attempts += 1;

      if (guess < target) {
        stdout.write("Too low. Try again.\n");
      } else if (guess > target) {
        stdout.write("Too high. Try again.\n");
      } else {
        stdout.write(`Correct! You guessed the number in ${attempts} ${attempts === 1 ? "attempt" : "attempts"}.\n`);
        break;
      }
    }
  } finally {
    readline.close();
  }
}

play().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});