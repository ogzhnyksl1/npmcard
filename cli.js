#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const inquirer = require("inquirer");
const open = require("open");

// -------------------- CARD DATA --------------------
const data = {
  name: chalk.green.bold("Oguzhan Yuksel"),
  location: chalk.cyan("Toronto, Canada"),
  work: chalk.white("Software Engineer"),
  openTo: chalk.green("Full-time, Contract, or Internship roles"),
  aiSkills: chalk.cyan("Machine Learning  |  Data Analysis"),
  backendSkills: chalk.yellow("C#  |  Python  |  Node.js  |  SQL  |  REST API"),
  frontendSkills: chalk.magenta("JavaScript  |  React  |  HTML  |  CSS"),
  github: chalk.gray("https://github.com/") + chalk.green("ogzhnyksl1"),
  linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("ogzhnyuksel"),
  email: chalk.white("ogzhn.yuksel94@gmail.com"),
  card: chalk.red("npx") + " " + chalk.white("ogzhnyksl"),
  message: chalk.bold(
    "Motivated software engineer with a strong academic background in AI, backend, and frontend development.\n" +
  "Eager to apply my skills to real-world projects—whether it's AI, backend, frontend, or full-stack.\n" +
  "Known as a problem solver, team player, and dedicated learner who is always ready to take on new challenges.\n" +
  "If you have a question or just want to connect, feel free to contact me!"
  ),
};

const output = `
${data.name}  ${data.location}

${chalk.white.bold("    Role:")}  ${data.work}
${chalk.white.bold(" Open to:")}  ${data.openTo}
${chalk.white.bold("     AI:")}  ${data.aiSkills}
${chalk.white.bold("Backend:")}  ${data.backendSkills}
${chalk.white.bold("Frontend:")}  ${data.frontendSkills}

${chalk.white.bold("  GitHub:")}  ${data.github}
${chalk.white.bold("LinkedIn:")}  ${data.linkedin}
${chalk.white.bold("   Email:")}  ${data.email}

${chalk.white.bold("    Card:")}  ${data.card}

${data.message}
`;

// ----------------- CENTERING THE CARD -----------------
function centerBox(boxString) {
  const termCols = process.stdout.columns || 80;
  return boxString
    .split('\n')
    .map(line => {
      const lineLength = line.replace(/\x1b\[[0-9;]*m/g, '').length;
      const pad = Math.max(0, Math.floor((termCols - lineLength) / 2));
      return ' '.repeat(pad) + line;
    })
    .join('\n');
}

const termRows = process.stdout.rows || 24;
const verticalPad = Math.floor(termRows / 36);

const boxCard = boxen(output, {
  padding: 1,
  margin: 1,
  borderStyle: "double",
  borderColor: "green",
});

console.log('\n'.repeat(verticalPad) + centerBox(boxCard));

// --------------- INTERACTIVE PERSISTENT MENU ---------------
function showMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: chalk.cyan.bold("What would you like to do?"),
        choices: [
          {
            name: "Send me an email",
            value: "email",
          },
          {
            name: "Visit my LinkedIn",
            value: "linkedin",
          },
          {
            name: "Visit my GitHub",
            value: "github",
          },
          {
            name: "View/Download my Resume (PDF)",
            value: "resume",
          },
          new inquirer.Separator(),
          {
            name: "Quit.",
            value: "quit",
          },
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "email":
          open("mailto:ogzhn.yuksel94@gmail.com");
          console.log("\n" + chalk.green("Launching your email client..."));
          setTimeout(showMenu, 700);
          break;
        case "linkedin":
          open("https://linkedin.com/in/ogzhnyuksel");
          console.log("\n" + chalk.green("Opening LinkedIn..."));
          setTimeout(showMenu, 700);
          break;
        case "github":
          open("https://github.com/ogzhnyksl1");
          console.log("\n" + chalk.green("Opening GitHub..."));
          setTimeout(showMenu, 700);
          break;
        case "resume":
          open("https://drive.google.com/file/d/1KrUC_QQPMbLN78QePtbbnMpZGv2ys4k-/view?usp=drive_link");
          console.log("\n" + chalk.green("Opening resume..."));
          setTimeout(showMenu, 700);
          break;
        default:
          console.log("\n" + chalk.blue("Thank you for checking out my Business card!"));
          break;
      }
    });
}
// To reshow the menu.
showMenu();
