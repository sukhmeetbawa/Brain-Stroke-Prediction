import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Grid, Typography } from "@material-ui/core";
import DonutChart from "../components/Chart";

const Data = () => {
  const [strokeCount, setStrokeCount] = useState(0);
  const [noStrokeCount, setNoStrokeCount] = useState(0);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const cookies = new Cookies();
  const cookie = cookies.get("access_token");

  useEffect(() => {
    axios
      .get("http://localhost:3001/data")
      .then((res) => {
        setStrokeCount(res.data.strokeCount);
        setNoStrokeCount(res.data.noStrokeCount);
        setMale(res.data.maleWithStroke);
        setFemale(res.data.femaleWithStroke);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      {cookie ? (
        <>
          <Grid item>
            <Typography variant="h2" style={{ fontWeight: "bold" }}>
              Data
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Number of people with stroke: {strokeCount}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Number of people without stroke: {noStrokeCount}
            </Typography>
          </Grid>
          <Grid item>
            <DonutChart
              series={[noStrokeCount, strokeCount]}
              labels={["No Stroke", "Stroke"]}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Number of Male with Stroke: {male}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Number of Female with Stroke: {female}
            </Typography>
          </Grid>
          <Grid item>
            <DonutChart series={[male, female]} labels={["Male", "Female"]} />
          </Grid>
        </>
      ) : (
        <Grid item>
          <Typography
            variant="h1"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              fontWeight: "bold",
            }}
          >
            Login First!
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Data;
