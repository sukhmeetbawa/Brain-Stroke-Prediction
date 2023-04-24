import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
  },
  credit: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

function Credits() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.credit}>
            <GitHubIcon className={classes.icon} />
            <span>Sukhmeet Singh Bawa - 20070122146</span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.credit}>
            <GitHubIcon className={classes.icon} />
            <span>Sudhanshu Thakur - 20070122143</span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.credit}>
            <GitHubIcon className={classes.icon} />
            <span>Sneh Patel - 20070122134</span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.credit}>
            <GitHubIcon className={classes.icon} />
            <span>Swapnil Biswas - 20070122148</span>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Credits;
