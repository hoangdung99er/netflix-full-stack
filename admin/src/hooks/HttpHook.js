import React, { useCallback, useEffect, useRef, useState } from "react";

function HttpHook() {
  const activeHttpRequest = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequest.current.push(httpAbortController);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal,
        });
        const responseData = await response.json();

        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController
        );

        if (!response.ok) {
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
        return responseData;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCrtl) => abortCrtl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest };
}

export default HttpHook;
