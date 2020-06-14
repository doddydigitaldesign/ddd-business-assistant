import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

interface Props {}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export const Footer = (props: Props) => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Business Assistant
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        An open source program to help small business owners in Sweden with
        keeping track of important dates.
      </Typography>
    </footer>
  );
};
