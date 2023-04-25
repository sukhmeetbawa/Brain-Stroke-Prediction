// Importing modules
import React, { useState } from "react";
import { Cookies } from "react-cookie";
import Axios from "axios";
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

  if (!cookie) {
    return (
      <Container className={classes.container}>
        <div className={classes.message}>
          <Typography variant="h2">Login First!</Typography>
        </div>
      </Container>
    );
  }

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

    //Initializing a request that can POST to the python backend
    const request = new XMLHttpRequest();
    request.open("POST", `/ProcessUserinfo/${JSON.stringify(userInfo)}`);
    request.send();

    //fetching using fetch function; i.e. GET request
    fetch(`/ProcessUserinfo/${JSON.stringify(userInfo)}`, { method: "POST" })
      .then((res) => res.json())
      .then((parsedObj) => {
        console.log(parsedObj);

        Axios.post(`http://localhost:3001/insert`, {
          userName: name,
          strokeStatus: parsedObj,
        });

        if (parsedObj === "No stroke") {
          alert("Congratulations! Your chances of a stroke are low.");
        } else {
          alert(
            "Your chances of getting a stroke are high, please consult a doctor!"
          );
        }
      });
  };

  return (
    <Container maxWidth="xs">
      <Box>
        <Typography component="h2" variant="h4" align="center">
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

export default Prediction;
