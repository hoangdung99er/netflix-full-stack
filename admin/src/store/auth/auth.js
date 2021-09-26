import { useCallback, useEffect, useState } from "react";
// import { authActions } from "./auth-context";
let logoutTimer;
export const useAuth = () => {
  const [token, setTokenUser] = useState(null);

  const [tokenExpiration, setTokenExpiration] = useState();

  const [userId, setUserId] = useState();

  const loginHandler = useCallback((uid, token, expirationDate) => {
    setTokenUser(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 2000 * 60 * 60);
    setTokenExpiration(tokenExpirationDate);
    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored && stored.token && new Date(stored.expiration) > new Date()) {
      loginHandler(stored.userId, stored.token, new Date(stored.expiration));
    }
  }, [loginHandler]);

  const logout = useCallback(() => {
    setTokenUser(null);
    setUserId(null);
    setTokenExpiration(null);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, token, tokenExpiration]);
  return { token, userId, loginHandler, logout };
};
