import React, { useState, lazy, Suspense } from "react";
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
import { Contact } from "../Pages/Contact";
import { NotFound } from "../Pages/NotFound/NotFound";
import { Navbar } from "../Navbar";
import { Fallback } from "../Fallback";

const Login = lazy(() =>
  import("../Pages/Authentication/Login").then((module) => ({
    default: module.Login,
  }))
);

const Register = lazy(() =>
  import("../Pages/Authentication/Register").then((module) => ({
    default: module.Register,
  }))
);

const ResetPassword = lazy(() =>
  import("../Pages/Authentication/ResetPassword").then((module) => ({
    default: module.ResetPassword,
  }))
);

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
              element={
                <Suspense fallback={<Fallback />}>
                  <Login setUser={setUser} />
                </Suspense>
              }
            />
            <Route
              path="register"
              element={
                <Suspense fallback={<Fallback />}>
                  <Register setUser={setUser} />
                </Suspense>
              }
            />
            <Route
              path="resetpassword"
              element={
                <Suspense fallback={<Fallback />}>
                  <ResetPassword />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
        <Outlet />
      </Router>
    </>
  );
};
