import React, { lazy, Suspense, useEffect } from 'react';
import darkTheme from '../../Utils/Themes/Dark';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { Homepage } from '../Pages/Homepage';
import { Portfolio } from '../Pages/Portfolio';
import { Pokedex } from '../Pages/Pokedex';
import { Contact } from '../Pages/Contact';
import { NotFound } from '../Pages/NotFound/NotFound';
import { Navbar } from '../Navbar';
import { Fallback } from '../Fallback';
import { auth } from '../../Utils/Authentication/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux/actions';

const Login = lazy(() =>
  import('../Pages/Authentication/Login').then((module) => ({
    default: module.Login,
  }))
);

const Register = lazy(() =>
  import('../Pages/Authentication/Register').then((module) => ({
    default: module.Register,
  }))
);

const ResetPassword = lazy(() =>
  import('../Pages/Authentication/ResetPassword').then((module) => ({
    default: module.ResetPassword,
  }))
);

const Logout = lazy(() =>
  import('../Pages/Authentication/Logout').then((module) => ({
    default: module.Logout,
  }))
);

export const App = () => {
  const dispatch = useDispatch();
  const { authenticateUser } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const timer = setTimeout(() => {
          authenticateUser(user);
        }, 100);
        return () => clearTimeout(timer);
      }
    });
  });
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
            <Route
              path="login"
              element={
                <Suspense fallback={<Fallback />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="register"
              element={
                <Suspense fallback={<Fallback />}>
                  <Register />
                </Suspense>
              }
            />
            <Route
              path="logout"
              element={
                <Suspense fallback={<Fallback />}>
                  <Logout />
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
