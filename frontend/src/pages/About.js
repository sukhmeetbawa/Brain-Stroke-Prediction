import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Box, Divider } from "@material-ui/core";
import Smoke from "../images/smoke.png";
import Bmi from "../images/BMI.png";
import Glucose from "../images/glucose.png";
import Age from "../images/age.png";

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
  },
  causeImage: {
    maxWidth: "100%",
    height: "auto",
  },
}));

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.aboutPage}>
      <Container maxWidth="md">
        <Box className={classes.aboutContainer}>
          <Typography variant="h4" align="center">
            ABOUT BRAIN STROKES
          </Typography>

          <Divider />

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
                <img src={Bmi} alt="BMI" className={classes.causeImage} />
                <Typography variant="h5">BMI</Typography>
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
                <img src={Age} alt="Age" className={classes.causeImage} />
                <Typography variant="h5">AGE</Typography>
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
                <img src={Smoke} alt="Smoking" className={classes.causeImage} />
                <Typography variant="h5">SMOKING</Typography>
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
                <img
                  src={Glucose}
                  alt="Diabetes"
                  className={classes.causeImage}
                />
                <Typography variant="h5">DIABETES</Typography>
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
