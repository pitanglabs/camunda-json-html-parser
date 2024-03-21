import fs from "fs";

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
    const htmlContent = convertJsonToHtml(inputFile);
    const htmlText = htmlContent.outerHTML;
    fs.writeFileSync(outputFileName, htmlText);
  } else {
    const jsonContent = convertHtmlToJson(inputFile);
    const jsonText = JSON.stringify(jsonContent, null, 2);
    fs.writeFileSync(outputFileName, jsonText);
  }
})();
