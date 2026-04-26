import React, { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
  favorites: [],
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (state.favorites.find((item) => item.key === action.payload.key)) return state;
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.key !== action.payload),
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};