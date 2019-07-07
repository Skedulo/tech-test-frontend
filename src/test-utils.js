// Source: https://testing-library.com/docs/react-testing-library/setup#custom-render
import { render } from "@testing-library/react";
import { ThemeProvider } from "emotion-theming";
import theme from "./styles/theme";
import React from "react";

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
