#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const inquirer = require("inquirer");
const open = require("open");

const data = {
  name: chalk.green.bold("Oguzhan Yuksel"),
  work: chalk.white("Software Engineer, Centennial College Graduate"),
  looking: chalk.gray.italic("Open to software engineering/internship opportunities"),
  github: chalk.gray("https://github.com/") + chalk.green("ogzhnyksl1"),
  linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("ogzhnyuksel"),
  email: chalk.white("ogzhn.yuksel94@gmail.com"),
  card: chalk.red("npx") + " " + chalk.white("ogzhnyksl"),
  message: chalk.italic(
    "Passionate about machine learning, backend & full-stack development,\n" +
    "Always eager to learn, grow, and contribute to impactful projects.\n" +
    "If you have a question or just want to connect, feel free to reach out!"
  ),
};

const output = `
${data.name}

${chalk.white.bold("      Work:")}  ${data.work}
${chalk.white.bold("   Looking:")}  ${data.looking}

${chalk.white.bold("   GitHub:")}  ${data.github}
${chalk.white.bold("  LinkedIn:")}  ${data.linkedin}
${chalk.white.bold("    Email:")}  ${data.email}

${chalk.white.bold("     Card:")}  ${data.card}

${data.message}
`;

// Horizontal centering
function centerBox(boxString) {
  const termCols = process.stdout.columns || 80;
  return boxString
    .split('\n')
    .map(line => {
      const lineLength = line.replace(/\x1b\[[0-9;]*m/g, '').length; // Strip ANSI
      const pad = Math.max(0, Math.floor((termCols - lineLength) / 2));
      return ' '.repeat(pad) + line;
    })
    .join('\n');
}

// Vertical centering (add empty lines)
const termRows = process.stdout.rows || 24;
const verticalPad = Math.floor(termRows / 6);

const boxCard = boxen(output, {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "green",
});

console.log('\n'.repeat(verticalPad) + centerBox(boxCard));

// Interactive menu
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
          name: "Download my Resume (PDF)",
          value: "resume",
        },
        new inquirer.Separator(),
        {
          name: "Just quit.",
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
        break;
      case "linkedin":
        open("https://linkedin.com/in/ogzhnyuksel");
        console.log("\n" + chalk.green("Opening LinkedIn..."));
        break;
      case "github":
        open("https://github.com/ogzhnyksl1");
        console.log("\n" + chalk.green("Opening GitHub..."));
        break;
      case "resume":
        open("https://drive.google.com/file/d/1KrUC_QQPMbLN78QePtbbnMpZGv2ys4k-/view?usp=drive_link");
        console.log("\n" + chalk.green("Opening resume..."));
        break;
      default:
        console.log("\n" + chalk.blue("Thank you for checking out my card!"));
        break;
    }
  });
