import React, { createContext, useReducer,useEffect } from 'react';
import config from '../../config';

// Action tipleri
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const storedState = localStorage.getItem('userState');
const initialState = storedState ? JSON.parse(storedState) : {
  userId: null,
  name: 'TEST',
  email: '',
  username: '',
  role: '',
  profile: {
    preferredLanguage: config.primaryLanguage,
    addresses: []
  },
  isLoggedIn: false
};

export const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        name: action.payload?.name || '',
        email: action.payload?.email || '',
        userId: action.payload.userId,
        userName: action.payload.userName,
        role: action.payload.role
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // sayfa yenilendiğinde localStorage'dan verileri geri al
  useEffect(() => {
    const storedState = localStorage.getItem('userState');
    if (storedState) {
      dispatch({ type: 'SET_STATE', payload: JSON.parse(storedState) });
    }
  }, []);

  // state değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('userState', JSON.stringify(state));
  }, [state]);

  const logout = () => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem('userState');
  };

  return (
    <UserContext.Provider value={{ state, dispatch,logout }}>
      {children}
    </UserContext.Provider>
  );
};

