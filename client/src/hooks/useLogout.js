import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const useLogout = () => {
  // initialize dispatch function
  const { dispatch } = useContext(UserContext);

  // remove token from localStorage and dispatch LOGOUT action
  const logout = () => {
    localStorage.removeItem('token');

    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};
