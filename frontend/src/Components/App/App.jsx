import React, { useState } from "react";
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
import { Register } from "../Pages/Authentication/Register";
import { Contact } from "../Pages/Contact";
import { NotFound } from "../Pages/NotFound/NotFound";
import { Navbar } from "../Navbar";

export const App = () => {
  const [user, setUser] = useState({});
  return (
    <>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="pokedex" element={<Pokedex />} />
            <Route path="Contact" element={<Contact />} />
            <Route
              path="login"
              element={<Login user={user} setUser={setUser} />}
            />
            <Route
              path="register"
              element={<Register user={user} setUser={setUser} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
        <Outlet />
      </Router>
    </>
  );
};
