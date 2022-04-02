import { createAriaEngine } from "./aria-engine";

// Get testing-library as a raw string so we can inject it in the
// actual createAriaEngine function to avoid it trying to load the module
// in the browser
//@ts-ignore
import TestingLibrary from "../node_modules/@testing-library/dom/dist/@testing-library/dom.umd?raw";

// get createAriaEngine body as a string and inject testing library
const createAriaEngineString =  createAriaEngine
  .toString() // convert function to string
  .replace(/[^{]*/, '') // just keep the function body
  .replace('REPLACE_WITH_TESTING_LIBRARY', TestingLibrary); // inject testing-library

// create a real function from the string
const createAriaEngineFn = new Function(createAriaEngineString);

export default createAriaEngineFn;