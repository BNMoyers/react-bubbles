import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Redirect } from "react-router-dom";

const Login = props => {
  const [credentials, setCredentials] = useState({});

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const loginCall = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => console.log(err.response));
  };
  return localStorage.getItem("token") ? (
    <Redirect to="/bubbles" />
  ) : (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={loginCall}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
          <input
          type="text"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
