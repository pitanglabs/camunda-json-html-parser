import inquirer from "inquirer";
import { validateInputFile } from "./validate.js";

const conversion_options = ["JSON to HTML", "HTML to JSON"];

export async function promptConversion() {
  const { conversion } = await inquirer.prompt({
    type: "list",
    name: "conversion",
    message: "Select a conversion",
    choices: conversion_options,
  });
  return conversion;
}

export async function promptInputFileName() {
  const { fileName } = await inquirer.prompt({
    type: "input",
    name: "fileName",
    message: "Enter the input file name",
  });

  const isValidInputFile = await validateInputFile(fileName);
  if (isValidInputFile) {
    return fileName;
  }
  return promptInputFileName();
}

export async function promptOutputFileName() {
  const { fileName } = await inquirer.prompt({
    type: "input",
    name: "fileName",
    message: "Enter the output file name",
  });
  return fileName;
}
