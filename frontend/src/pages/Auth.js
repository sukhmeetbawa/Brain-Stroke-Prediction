import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  authContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  formGroup: {
    marginBottom: theme.spacing(2),
  },
}));

const Auth = () => {
  const [mode, setMode] = useState("login");
  const API_URL = "http://localhost:3001/auth";

  return (
    <>
      {mode === "login" ? (
        <>
          <Login API_URL={API_URL} setMode={setMode} />
        </>
      ) : (
        <>
          <Register API_URL={API_URL} setMode={setMode} />
        </>
      )}
    </>
  );
};

const Login = ({ API_URL, setMode }) => {
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
      localStorage.setItem("userID", result.data.userID);
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
      label="Login"
      toggleLabel="Register"
      onToggleClick={() => setMode("register")}
    />
  );
};

const Register = ({ API_URL, setMode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${API_URL}/register`, { username, password });
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
      toggleLabel="Login"
      onToggleClick={() => setMode("login")}
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
  toggleLabel,
  onToggleClick,
}) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Box className={classes.authContainer}>
        <Typography component="h2" variant="h4">
          {label}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formGroup}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className={classes.formGroup}>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          {message && (
            <Typography color="error" gutterBottom>
              {message}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary">
            {label}
          </Button>
          {toggleLabel && (
            <Button color="primary" onClick={onToggleClick}>
              {toggleLabel}
            </Button>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default Auth;
