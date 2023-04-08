import React from "react";
import { theme as themePalete } from "../theme";

export const ThemeContext = React.createContext();

export const ThemeContextProvider = ({ children }) => {
  const theme = themePalete.lightTheme;

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
