// Importing modules
import React, { useState } from "react";
import { Cookies } from "react-cookie";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
  Typography,
  Input,
  Box,
  Grid,
  makeStyles,
} from "@material-ui/core";
import MessageComponent from "../components/Message";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  message: {
    textAlign: "center",
  },
}));

function Prediction() {
  //Using useState to set incoming variable from Python backend
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [glucose, setGlucose] = useState("");
  const [bmi, setBmi] = useState("");
  const [heart, setHeart] = useState("");
  const [hypertension, setHypertension] = useState("");
  const [gender, setGender] = useState("");
  const [marital, setMaritalStatus] = useState("");
  const [work, setWorkStatus] = useState("");
  const [residence, setResidenceStatus] = useState("");
  const [smoking, setSmokingStatus] = useState("");

  const classes = useStyles();

  const cookies = new Cookies();
  const cookie = cookies.get("access_token");
  const userID = localStorage.getItem("userID");
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState("info");
  const navigate = useNavigate();
  const [strokeStatus, setStrokeStatus] = useState(false);

  if (!cookie) {
    return (
      <Container className={classes.container}>
        <div className={classes.message}>
          <Typography variant="h2" style={{ fontWeight: "bold" }}>
            Login First!
          </Typography>
        </div>
      </Container>
    );
  } else {
    const sendUserInfo = (event) => {
      event.preventDefault();
      let userInfo = [];
      userInfo.push(
        name,
        gender,
        age,
        hypertension,
        heart,
        marital,
        work,
        residence,
        glucose,
        bmi,
        smoking
      );
      console.log(userInfo);


      axios.post('/prediction', userInfo)
        .then((response) => {
          console.log(response.data); // Print the response data to the console
          if (response.data === "No stroke") {
            setStrokeStatus(false);
            setMessage("Congratulations! Your chances of a stroke are low.");
            setSeverity("success");
          } else {
            setStrokeStatus(true);
            setMessage("Ohh No! Your chances of getting a stroke are high");
            setSeverity("error");
          }
          axios.post(`/data`, {
            userID: userID,
            gender: gender,
            age: age,
            strokeStatus: strokeStatus,
          });
          setTimeout(() => {
            navigate("/data");
          }, 5000); // Delay navigation by 2 seconds (2000 milliseconds)
        })
        .catch((error) => {
          console.error(error);
          // Handle the error
        });
    };

    return (
      <Container maxWidth="xs">
        <Box>
          {message && (
            <MessageComponent message={message} severity={severity} />
          )}
          <Typography
            component="h2"
            variant="h2"
            align="center"
            style={{ fontWeight: "bold", marginTop: "20px" }}
          >
            Enter Details
          </Typography>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input
                    id="name"
                    type="text"
                    inputProps={{ min: 0 }}
                    required
                    onChange={(event) => setName(event.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="gender">Gender</InputLabel>
                  <Select
                    id="gender"
                    name="gender"
                    required
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="age">Age</InputLabel>
                  <Input
                    id="age"
                    type="number"
                    inputProps={{ min: 0 }}
                    required
                    onChange={(event) => setAge(event.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="hypertension">Hypertension</InputLabel>
                  <Select
                    id="hypertension"
                    value={hypertension}
                    onChange={(event) => setHypertension(event.target.value)}
                    required
                  >
                    <MenuItem value={0}>False</MenuItem>
                    <MenuItem value={1}>True</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="heart">Heart Disease</InputLabel>
                  <Select
                    id="heart"
                    value={heart}
                    onChange={(e) => setHeart(e.target.value)}
                    required
                  >
                    <MenuItem value={0}>False</MenuItem>
                    <MenuItem value={1}>True</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="marital">Marital Status</InputLabel>
                  <Select
                    id="marital"
                    name="marital"
                    required
                    onChange={(e) => setMaritalStatus(e.target.value)}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="work">Work Status</InputLabel>
                  <Select
                    id="work"
                    name="work"
                    required
                    onChange={(e) => setWorkStatus(e.target.value)}
                  >
                    <MenuItem value="Private">Private Job</MenuItem>
                    <MenuItem value="Self-employed">Self Employed</MenuItem>
                    <MenuItem value="Govt-job">Government Job</MenuItem>
                    <MenuItem value="Children">Housekeeper</MenuItem>
                    <MenuItem value="Never worked">Never Worked</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="residence">Residence Status</InputLabel>
                  <Select
                    id="residence"
                    name="residence"
                    required
                    onChange={(e) => setResidenceStatus(e.target.value)}
                  >
                    <MenuItem value="Urban">Urban</MenuItem>
                    <MenuItem value="Rural">Rural</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="glucose">Glucose Level</InputLabel>
                  <Input
                    id="glucose"
                    type="number"
                    inputProps={{ min: 0 }}
                    required
                    onChange={(event) => setGlucose(event.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="bmi">Body Mass Index</InputLabel>
                  <Input
                    id="bmi"
                    type="number"
                    inputProps={{ min: 0 }}
                    required
                    onChange={(event) => setBmi(event.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="smoking">Smoking Status</InputLabel>
                  <Select
                    id="smoking"
                    name="smoking"
                    required
                    onChange={(e) => setSmokingStatus(e.target.value)}
                  >
                    <MenuItem value="smokes">Active Smoker</MenuItem>
                    <MenuItem value="formerly smoked">Former Smoker</MenuItem>
                    <MenuItem value="never smoked">Never Smoked</MenuItem>
                    <MenuItem value="Unknown">Unknown</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={sendUserInfo}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    );
  }
}

export default Prediction;
