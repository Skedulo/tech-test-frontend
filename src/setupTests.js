// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import "@testing-library/react/cleanup-after-each";
// this adds jest-dom's custom assertions
import "jest-dom/extend-expect";

// this is just a little hack to silence a warning that we'll get until react
// fixes this: https://github.com/facebook/react/pull/14853
// remove when upgrading react-dom@16.9.0^
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
