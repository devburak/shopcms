import React, { createContext, useReducer } from 'react';
import config from '../../config';
const initialState = {
  isOpen: [],
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true
};

export const MenuContext = createContext();

const menuReducer = (state, action) => {
  let id;
  switch (action.type) {
    case 'MENU_OPEN':
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case 'MENU_CLOSE':
      return {
        ...state,
        isOpen: state.isOpen.filter((id) => id !== action.id)
      };
    case 'SET_MENU':
      return {
        ...state,
        opened: action.opened
      };
    default:
      return state;
  }
};

export const MenuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  return (
    <MenuContext.Provider value={{ state, dispatch }}>
      {children}
    </MenuContext.Provider>
  );
};
