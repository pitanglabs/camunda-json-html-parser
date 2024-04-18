# camunda-json-html-parser

A parser utility for converting JSON to HTML and HTML to JSON specifically designed for use with Camunda 7 forms.

## Table of Contents

- [Usage](#usage)
- [Test](#test)
- [Contributing](#contributing)
- [License](#license)

## Usage

To use this library in your project, follow these steps:

1. Add the library as a dependency in your package.json file using the git format.

   ```json
   "dependencies": {
     "camunda-json-html-parser": "git+https://github.com/pitanglabs/camunda-json-html-parser.git"
   }
   ```

1. Run `npm install` to install the library and its dependencies.
1. Now you can import and use the functions exported by the library in your project:

   ```js
   import {
     convertHtmlToJson,
     convertJsonToHtml,
   } from "camunda-json-html-parser";

   // Provide the browser DOM Document (window.document)
   const convertedHtml = convertJsonToHtml(document, jsonContent);
   ```

## Test

1. Clone the repository to your local machine.
1. Navigate into the project directory:

   ```bash
   $ cd camunda-json-html-parser
   ```

1. Install dependencies:

   ```bash
   $ npm install
   ```

1. Run the test application:

   ```bash
   $ npm run test
   ```

1. Follow the Prompts:
   - Choose the conversion type (JSON to HTML or HTML to JSON).
   - Enter the input and output file paths.
   - Note: Ensure the input file is located in the directory.
1. Optional: Format HTML File:
   If converting from JSON to HTML, you can run the following command after conversion to format the HTML file for readability:

   ```
   $ npm run prettier
   ```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
