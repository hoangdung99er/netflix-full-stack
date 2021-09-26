import React, { useRef, useState, useContext } from "react";
import "./Register.scss";
import { Link, useHistory } from "react-router-dom";
import HttpHook from "../../hooks/HttpHook";
import { AuthContext } from "../../context/auth/AuthContext";

function Register() {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const { sendRequest } = HttpHook();
  const { token } = useContext(AuthContext);
  const DS = process.env.REACT_APP_DOMAIN_SERVER;

  const emailRef = useRef();

  const handleStart = (e) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
  };

  const handleChange = (e) => {
    setUser({ ...user, email, [e.target.name]: e.target.value });
  };
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendRequest(
      `${DS}/auth/register`,
      "POST",
      JSON.stringify(user),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    );

    history.push("/login");
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt=""
          />
          <Link to="/login">
            <button className="loginButton">Sign In</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Lorem ipsum dolor sit amet.</h1>
        <h2>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate,
          molestiae.
        </h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
        {!email && (
          <div className="input">
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter your email address"
            />
            <button onClick={handleStart} className="registerButton">
              Get Started
            </button>
          </div>
        )}
        {email && (
          <form onSubmit={handleSubmit} className="inputEmailPassword">
            <input
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Enter your username"
            />
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <button className="registerButton">Start</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
