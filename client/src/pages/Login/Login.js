import React, { useContext } from "react";
import { useState } from "react";
import "./Login.scss";
import { useHistory } from "react-router-dom";
import HttpHook from "../../hooks/HttpHook";
import {Link} from 'react-router-dom'
import { AuthContext } from "../../context/auth/AuthContext";

function Login() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const { token, login } = useContext(AuthContext);
  const { sendRequest } = HttpHook();
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlerSubmitLogin = async (e) => {
    e.preventDefault();

    const response = await sendRequest(
      `${DS}/auth/login`,
      "POST",
      JSON.stringify(user),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    );
    login(response?.userId, response?.token);
    history.push("/");
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form onSubmit={handlerSubmitLogin}>
          <h1>Sign In</h1>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <button type="submit" className="loginButton">
            Sign In
          </button>
          <span>
            <Link to="/register">
              <b>Sign Up </b>
            </Link>
            now
          </span>
          <small>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            perspiciatis? <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}

export default Login;
