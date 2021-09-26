import MovieReducer from "./MovieReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  movies: [],
};

export const MovieContext = createContext(INITIAL_STATE);

export const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);

  return (
    <MovieContext.Provider value={{ movies: state.movies, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};
