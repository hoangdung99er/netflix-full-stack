// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./auth-context";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });
import { AuthContext } from "./auth-context";
import { useAuth } from "./auth";

export const AuthProvider = ({ children }) => {
  const { loginHandler, logout, token, userId } = useAuth();

  // useEffect(() => { 
  //   localStorage.setItem("user", JSON.stringify(user))
  // }, [])

  return (
    <AuthContext.Provider
      value={{
        token: token,
        userId: userId,
        logout: logout,
        login: loginHandler,
        isLoggedIn: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
