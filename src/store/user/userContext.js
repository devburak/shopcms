import React, { createContext, useReducer } from 'react';
import config from '../../config';
const initialState = {
  userId:null,
  userName:'',
  role:'',
  profile:{
    preferredLanguage:config.primaryLanguage,
    addresses:[]
  }
};

export const UserContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
      case 'SET_LANGUAGE':
        return {
          ...state,
          profile: [...state.profile, action.preferredLanguage]
        };
      default:
        return state;
    }
  };

  export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
  
    return (
      <UserContext.Provider value={{ state, dispatch }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  