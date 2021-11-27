import React, { createContext, useReducer } from "react";
import { appReducer, initialState } from "./reducer";

export const AppContext = createContext();

export default function AppContextProvider(props) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}
