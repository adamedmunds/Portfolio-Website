import React from "react";
import darkTheme from "../../Utils/Themes/Dark";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Navbar } from "../Navbar";

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
    </ThemeProvider>
  );
};
