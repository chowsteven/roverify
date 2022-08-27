import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const useLogin = () => {
  // initialize context and state
  const { dispatch } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username, password) => {
    // on login, set loading state and clear errors
    setIsLoading(true);
    setError(null);

    // send POST request to login API
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const responseJSON = await response.json();

    if (!response.ok) {
      // clear loading state and set errors
      setIsLoading(false);
      setError(responseJSON.error);
    } else {
      // save JWT token to LocalStorage
      localStorage.setItem('token', JSON.stringify(responseJSON));

      // dispatch login action, send JWT token as payload
      dispatch({ type: 'LOGIN', payload: responseJSON });

      // clear loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
