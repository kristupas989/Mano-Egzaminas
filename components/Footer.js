//next
import Link from "next/link";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: "0",
  },
  Toolbar: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  footerText: {
    marginRight: "10px",
    fontFamily: "Zilla Slab",
  },

  container: {
    width: "auto",
  },

  button: {
    color: "white",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.7rem",
    },
  },
  madeBy: {
    position: "absolute",
    right: "0",
    bottom: "0",
    fontSize: "15px",
    fontFamily: "Zilla Slab",
    color: "white",
    cursor: "hover",
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
      border: "1px solid red",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
      border: "1px solid red",
    },
  },
}));
function Footer() {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.toolbarMargin} />
      <div className={classes.root}>
        <AppBar position="relative" color='secondary'>
          Kristupas Kardauaskas
            
        </AppBar>
      </div>
    </Fragment>
  );
}

export default Footer;
