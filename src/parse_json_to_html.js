export function convertJsonToHtml(domDocument, inputFile) {
  console.log("dom document", domDocument);
  console.log("Converting JSON to HTML");

  const jsonInput = parseJsonContent(inputFile);
  const jsonComponents = jsonInput.components;

  const uploadComponent = jsonComponents.filter((component) => {
    return component.type === "upload";
  })[0];

  let divComponents = jsonComponents.map((component) =>
    convertJsonComponentToHtmlDiv(domDocument, component),
  );

  if (uploadComponent) {
    divComponents.push(
      createUploadedDocumentsDiv(domDocument, uploadComponent),
    );
  }

  const scriptComponents = jsonComponents
    .filter((component) => component.type === "upload")
    .map((component) =>
      convertJsonComponentToUploadScript(domDocument, component),
    );

  const htmlForm = createHtmlForm(domDocument, "form");
  divComponents.forEach((component) => htmlForm.appendChild(component));
  scriptComponents.forEach((component) => htmlForm.appendChild(component));

  return htmlForm;
}

function parseJsonContent(content) {
  return JSON.parse(content);
}

function createHtmlForm(document, formName) {
  const htmlForm = document.createElement("form");
  htmlForm.setAttribute("role", "form");
  htmlForm.setAttribute("name", formName);
  htmlForm.classList.add("form-horizontal");
  return htmlForm;
}

function convertJsonComponentToHtmlDiv(document, component) {
  const formGroup = document.createElement("div");
  formGroup.classList.add("form-group");

  const label = createHtmlLabel(document, component.key, component.label);

  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("col-md-8");

  const inputComponent = createInputComponent(document, component);

  if (inputComponent !== undefined) {
    inputWrapper.appendChild(inputComponent);
    formGroup.appendChild(label);
    formGroup.appendChild(inputWrapper);
  }

  return formGroup;
}

function createUploadedDocumentsDiv(document, uploadComponent) {
  const formGroup = document.createElement("div");
  formGroup.classList.add("form-group");

  const label = createHtmlLabel(document, null, "Documentos Importados");

  const formControl = document.createElement("div");
  formControl.classList.add("form-control-static", "col-md-8");

  const downloadLink = document.createElement("a");
  downloadLink.setAttribute("cam-file-download", uploadComponent.key);

  formControl.appendChild(downloadLink);
  formGroup.appendChild(formControl);

  return formGroup;
}

function convertJsonComponentToUploadScript(document, component) {
  const key = component.key;
  const scriptElement = document.createElement("script");
  scriptElement.setAttribute("cam-script", "");
  scriptElement.setAttribute("type", "text/form-script");

  ``;
  scriptElement.textContent = `
  var fileUpload = $('#${key}');
  var fileUploadHelpBlock = $('.help-block', fileUpload.parent());

  function flagFileUpload() {
    var hasFile = fileUpload.get(0).files.length > 0;
    fileUpload[hasFile ? 'removeClass' : 'addClass']('ng-invalid');
    fileUploadHelpBlock[hasFile ? 'removeClass' : 'addClass']('error');
    return hasFile;
  }

  fileUpload.on('change', function () {
    flagFileUpload();
  });
`;

  return scriptElement;
}

function createHtmlLabel(document, key, label) {
  const htmlLabel = document.createElement("label");
  htmlLabel.classList.add("control-label", "col-md-4");
  htmlLabel.setAttribute("for", key);
  htmlLabel.textContent = label;
  return htmlLabel;
}

function createInputComponent(document, component) {
  const { key, type } = component;

  switch (type) {
    case "textfield": {
      const isRequired = component.validate && component.validate.required;
      const hasPattern = component.validate && component.validate.pattern;
      const isReadOnly = component.validate && component.validate.readOnly;
      return createHtmlInputField(document, key, type, isRequired, hasPattern, isReadOnly);
    }
    case "select": {
      const optionValues = component.values;
      return createHtmlSelectField(document, key, optionValues);
    }
    case "upload": {
      return createHtmlUploadField(document, key);
    }
    case "number": {
      return createHtmlNumberField(document, key);
    }
  }
  // TODO: definir default
  return createHtmlInputField(document, key, type, true);
}

function createHtmlInputField(document, key, type, required, pattern, readOnly) {
  const inputField = document.createElement("input");
  inputField.setAttribute("cam-variable-name", key);
  inputField.setAttribute("cam-variable-type", "String");
  inputField.setAttribute("id", key);
  inputField.setAttribute("name", key);
  inputField.setAttribute("class", "form-control");

  if (type === "textfield") {
    inputField.setAttribute("type", "text");
    if (pattern) {
      inputField.setAttribute("pattern", pattern);
    }
  }

  if (required) {
    inputField.setAttribute("required", true);
  }

  if (readOnly) {
    inputField.setAttribute("readonly", true);
  }
  return inputField;
}

function createHtmlSelectField(document, key, optionValues) {
  const selectField = document.createElement("select");
  selectField.setAttribute("cam-variable-name", key);
  selectField.setAttribute("cam-variable-type", "String");
  selectField.setAttribute("class", "form-control");
  selectField.setAttribute("name", key);
  selectField.setAttribute("id", key);

  const optionFields = optionValues.map((option) => {
    const optionField = document.createElement("option");
    optionField.setAttribute("value", option.value);
    optionField.textContent = option.label;
    return optionField;
  });

  optionFields.forEach((option) => selectField.appendChild(option));
  return selectField;
}

function createHtmlUploadField(document, key) {
  const inputField = document.createElement("input");
  inputField.setAttribute("type", "file");
  inputField.setAttribute("id", key);
  inputField.setAttribute("cam-variable-name", key);
  inputField.setAttribute("cam-variable-type", "File");
  inputField.setAttribute("cam-max-filesize", "10000000");
  inputField.setAttribute("class", "form-control");
  inputField.setAttribute("accept", "application/pdf,application/vnd.ms-excel");
  return inputField;
}

function createHtmlNumberField(document, key) {
  const inputField = document.createElement("input");
  inputField.setAttribute("type", "number");
  inputField.setAttribute("id", key);
  inputField.setAttribute("class", "form-control");
  return inputField;
}
