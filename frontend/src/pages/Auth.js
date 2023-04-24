import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3001/auth";

export const Auth = () => {
  const [mode, setMode] = useState("login");

  const handleModeSwitch = () => {
    setMode("register");
  };

  return (
    <div className="auth">
      {mode === "login" ? (
        <>
          <Login />
          <button onClick={handleModeSwitch}>Register</button>
        </>
      ) : (
        <>
          <Register />
          <button onClick={() => setMode("login")}>Login</button>
        </>
      )}
    </div>
  );
};

const Login = () => {
  const [, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      // message={message}
      label="Login"
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${API_URL}/register`, {
        username,
        password,
      });

      setMessage("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      label="Register"
      message={message}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
  label,
  message,
}) => {
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {message && <div>{message}</div>}
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};
