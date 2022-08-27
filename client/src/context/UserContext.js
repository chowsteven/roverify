import { createContext, useReducer, useEffect } from 'react';

// create context
export const UserContext = createContext();

// create reducer function
export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  // check if localStorage contains an auth token on first render
  // if it does, log user in
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token) {
      dispatch({ type: 'LOGIN', payload: token });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
