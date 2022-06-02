import { useEffect, Fragment } from 'react';
import darkTheme from '../../Utils/Themes/Dark';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { Homepage } from '../../Pages/Homepage';
import { Portfolio } from '../../Pages/Portfolio';
import { Pokedex } from '../../Pages/Pokedex';
import { Contact } from '../../Pages/Contact';
import { NotFound } from '../../Pages/NotFound/NotFound';
import { Navbar } from '../Navbar';
import { auth } from '../../Utils/Authentication/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../Redux/actions';
import { Profile } from '../../Pages/Profile';
import { ProfileEdit } from '../../Pages/Profile/ProfileEdit';
import {
  Login,
  Register,
  ResetPassword,
  Logout,
} from '../../Pages/Authentication';

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
    <Fragment>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='portfolio' element={<Portfolio />} />
            <Route path='Contact' element={<Contact />} />
            <Route path='pokedex' element={<Pokedex />} />
            <Route path='profile' element={<Profile />} />
            <Route path='profile/edit' element={<ProfileEdit />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='logout' element={<Logout />} />
            <Route path='resetpassword' element={<ResetPassword />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </ThemeProvider>
        <Outlet />
      </Router>
    </Fragment>
  );
};
