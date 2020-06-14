import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

interface Props {
  primaryText: JSX.Element;
  secondaryText: JSX.Element;
  mainButton: JSX.Element;
  secondaryButton: JSX.Element;
}

export const CallToAction = (props: Props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {props.primaryText}
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        {props.secondaryText}
      </Typography>
      <div className={classes.heroButtons}>
        <Grid container spacing={2} justify="center">
          <Grid item>{props.mainButton}</Grid>
          <Grid item>{props.secondaryButton ?? null}</Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
