import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Box, Divider } from "@material-ui/core";
import DonutChart from "../components/Chart";

const useStyles = makeStyles((theme) => ({
  aboutPage: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
  },
  aboutContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  sectionHeader: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.aboutPage} style={{ textAlign: "center" }}>
      <Container maxWidth="md">
        <Box className={classes.aboutContainer}>
          <Typography
            variant="h2"
            align="center"
            style={{ fontWeight: "bold" }}
          >
            About Brain Strokes
          </Typography>

          <Typography variant="body1">
            A stroke is a medical emergency that occurs when the blood supply to
            part of the brain is interrupted or reduced. Symptoms include
            trouble speaking, understanding, walking, and paralysis or numbness
            in the face, arm, or leg.
          </Typography>

          <Typography variant="body1">
            Early treatment with medication like tPA can minimize brain damage,
            while other treatments aim to limit complications and prevent
            additional strokes.
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="h3"
            align="center"
            className={classes.sectionHeader}
          >
            Major Causes
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box className={classes.aboutContainer}>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                  BMI
                </Typography>
                <DonutChart series={[15.3, 84.7]} labels={["Fit", "Obese"]} />
                <Typography variant="body1">
                  Obesity increases risk for stroke by several distinct
                  mechanisms including diabetes mellitus, hypertension,
                  accelerated atherosclerosis, atrial fibrillation, and
                  obstructive sleep apnea. The end result may be progressive
                  atherosclerosis and/or thromboembolism that may result in
                  arterial occlusion or rupture.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className={classes.aboutContainer}>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                  AGE
                </Typography>
                <DonutChart
                  series={[28.9, 71.1]}
                  labels={["Adult", "Elderly"]}
                />
                <Typography variant="body1">
                  The older you are, the more likely you are to have a stroke.
                  The chance of having a stroke about doubles every 10 years
                  after age 55. Although stroke is common among older adults,
                  many people younger than 65 years also have strokes.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className={classes.aboutContainer}>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                  SMOKING
                </Typography>
                <DonutChart
                  series={[36.1, 63.9]}
                  labels={["Non Smoker", "Active Smoker"]}
                />
                <Typography variant="body1">
                  Smoking is a major cause of cardiovascular disease (CVD) and
                  causes one of every four deaths from CVD. Secondhand smoke
                  increases the risk for stroke by 20−30%. Each year, secondhand
                  smoke exposure causes more than 8,000 deaths from stroke.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className={classes.aboutContainer}>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                  DIABETES
                </Typography>
                <DonutChart
                  series={[40.2, 15.3, 44.6]}
                  labels={["Diabetic", "Pre Diabetic", "Non Diabetic"]}
                />
                <Typography variant="body1">
                  Diabetes is a well-established risk factor for stroke. It can
                  cause pathologic changes in blood vessels at various locations
                  and can lead to stroke if cerebral vessels are directly
                  affected. Additionally, mortality is higher and poststroke
                  outcomes are poorer in patients with stroke with uncontrolled
                  glucose levels.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default About;
