import fs from "fs";

export async function validateInputFile(inputFileName) {
  return fs.existsSync(inputFileName);
}
