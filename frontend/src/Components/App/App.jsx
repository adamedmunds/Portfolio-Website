import React from "react";
import darkTheme from "../../Utils/Themes/Dark";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Homepage } from "../Pages/Homepage";
import { Portfolio } from "../Pages/Portfolio";
import { Pokedex } from "../Pages/Pokedex";
import { Login } from "../Pages/Authentication/Login";
import { Contact } from "../Pages/Contact";
import { NotFound } from "../Pages/NotFound/NotFound";
import { Navbar } from "../Navbar";

export const App = () => {
  return (
    <>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="pokedex" element={<Pokedex />} />
            <Route path="Contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
        <Outlet />
      </Router>
    </>
  );
};
