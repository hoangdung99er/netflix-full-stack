import { createContext } from "react";
import { useAuth } from "./AuthActions";

const INITIAL_STATE = {
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isLoggedIn : false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const { token, userId, loginHandler, logout } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login: loginHandler,
        logout,
        isLoggedIn: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
