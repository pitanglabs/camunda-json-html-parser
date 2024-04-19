//import { JSDOM } from "jsdom";

export function convertHtmlToJson(inputFile) {
  console.log("Converting HTML to JSON");
  // Parse the HTML content
  //const htmlInput = parseHtmlContent(inputFile);
  const htmlComponents = parseHtmlComponents(inputFile);

  return {
    components: htmlComponents,
    schemaVersion: 15,
    exporter: {
      name: "form-js (https://demo.bpmn.io)",
      version: "1.7.1",
    },
    type: "default",
    id: "Form_0cbtq3o",
  };
}

// function parseHtmlContent(content) {
//   console.log('content',content)
//   const dom = new JSDOM(content);
//   console.log('dom',dom)
//   const document = dom.window.document;
//   console.log('document',document)
//   return document;
// }

function parseHtmlComponents(htmlInput) {
  console.log('htmlInput',htmlInput)
  const formGroups = Array.from(
    htmlInput.querySelectorAll('form[class="form-horizontal"] .form-group'),
  );
  const components = formGroups.map((formGroup) => {
    return parseFormGroup(formGroup);
  });

  return components;
}

function parseFormGroup(formGroup) {
  console.log('formGroup',formGroup)
  const label = formGroup.querySelector(".control-label").textContent.trim();
  const input = formGroup.querySelector("input, select, a");
  const inputType = resolveInputType(input);
  const key = input.getAttribute("id");
  const validate = {};
  if (input.hasAttribute("required")) {
    validate.required = true;
  }

  let parseResult = {
    label: label,
    type: inputType,
    id: key,
    key: key,
  };

  if (inputType === "textfield") {
    parseResult = {
      ...parseResult,
      validate,
    };
  } else if (inputType === "select") {
    const optionValues = parseOptionValues(input);
    parseResult = {
      ...parseResult,
      values: optionValues,
    };
  }

  return parseResult;
}

function resolveInputType(input) {
  const inputTag = input.tagName.toLowerCase();
  const inputType = input.getAttribute("type");
  if (inputTag === "select") {
    return "select";
  }
  if (inputType === "file") {
    return "upload";
  }
  return "textfield";
}

function parseOptionValues(input) {
  const options = Array.from(input.querySelectorAll("option"));
  const values = options.map((option) => {
    return {
      label: option.textContent.trim(),
      value: option.getAttribute("value"),
    };
  });
  return values;
}
