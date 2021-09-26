import { createContext, useReducer } from "react";
import ListReducer from "./ListReducer";

const INITIAL_STATE = {
  lists: [],
};

export const ListContext = createContext(INITIAL_STATE);

export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, INITIAL_STATE);

  return (
    <ListContext.Provider value={{ lists: state.lists, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};
