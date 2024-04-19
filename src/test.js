import fs from "fs";
import { JSDOM } from "jsdom";

// Create a new JSDOM instance to simulate a browser environment
const { window } = new JSDOM();
const document = window.document;

import {
  promptConversion,
  promptInputFileName,
  promptOutputFileName,
} from "./prompt.js";

import { convertJsonToHtml } from "./parse_json_to_html.js";
import { convertHtmlToJson } from "./parse_html_to_json.js";

(async () => {
  const conversion = await promptConversion();
  const inputFileName = await promptInputFileName();
  const outputFileName = await promptOutputFileName();

  const inputFile = fs.readFileSync(inputFileName, "utf8");

  if (conversion == "JSON to HTML") {
    // Needs a DOM document to test, can create a mock one using JSDOM
    const htmlContent = convertJsonToHtml(document, inputFile);
    const htmlText = htmlContent.outerHTML;
    fs.writeFileSync(outputFileName, htmlText);
  } else {
    const jsonContent = convertHtmlToJson(inputFile);
    const jsonText = JSON.stringify(jsonContent, null, 2);
    fs.writeFileSync(outputFileName, jsonText);
  }
})();
