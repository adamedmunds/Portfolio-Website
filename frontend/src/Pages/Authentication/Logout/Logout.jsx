import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../Utils/Authentication/firebase-config';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../Redux/actions';
import { Navigate } from 'react-router-dom';

export const Logout = () => {
  const dispatch = useDispatch();
  const { logoutUser } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    signOut(auth);
    logoutUser();
  });
  return <Navigate to="/" />;
};
