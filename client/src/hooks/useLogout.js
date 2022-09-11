import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  // initialize dispatch function
  const { dispatch } = useContext(UserContext);
  let navigate = useNavigate();

  // remove token from localStorage and dispatch LOGOUT action
  const logout = () => {
    localStorage.removeItem('token');

    dispatch({ type: 'LOGOUT' });

    navigate('/');
  };

  return { logout };
};
