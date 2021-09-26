import React, { useState, useContext } from "react";
import classes from "./Login.module.css";
import HttpHook from "../../hooks/HttpHook";
// import { useDispatch } from "react-redux";
// import { AuthLogin } from "../../store/auth";
import { AuthContext } from "../../store/auth/auth-context";

function Login() {
  //   const dispatch = useDispatch();
  const { sendRequest, isLoading } = HttpHook();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  const loginHandler = async (e) => {
    e.preventDefault();

    const response = await sendRequest(
      `${DS}/auth/login`,
      "POST",
      JSON.stringify({ email, password }),
      {
        "Content-Type": "application/json",
      }
    );

    !response?.isAdmin && setError("Only admin can only be login");
    response?.isAdmin && login(response.userId, response.token);

    // dispatch(AuthLogin(response.userId, response.token));
  };
  return (
    <div className={classes.login}>
      <form onSubmit={loginHandler} className={classes.loginForm}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={classes.loginInput}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          className={classes.loginInput}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <span>{error}</span>}
        <button disabled={isLoading} className={classes.loginButton}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
