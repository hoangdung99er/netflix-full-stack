import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";

let logoutTimer;
export const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [token, setTokenUser] = useState(null);
  const [expirationDateToken, setExpirationDateToken] = useState();
  const loginHandler = useCallback(async (uid, token, expirationDate) => {
    setUserId(uid);
    setTokenUser(token);
    const expiration =
      expirationDate || new Date(new Date().getTime() + 2000 * 60 * 60);
    setExpirationDateToken(expiration);
    localStorage.setItem(
      "user",
      JSON.stringify({
        userId: uid,
        token: token,
        expirationDate: expiration.toISOString(),
      })
    );
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (
      stored && stored.token &&
      new Date(stored.expirationDate) > new Date()
    ) {
      loginHandler(
        stored.userId,
        stored.token,
        new Date(stored.expirationDate)
      );
    }
  }, [loginHandler]);

  const logout = useCallback(() => {
    setUserId(null);
    setTokenUser(null);
    setExpirationDateToken(null);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    if (token && expirationDateToken) {
      const remainingTime =
        expirationDateToken.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, expirationDateToken, logout]);

  return { token, userId, loginHandler, logout };
};
