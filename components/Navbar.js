//next
import { useRouter } from "next/router";
import Link from "next/link";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  Toolbar: {
    display: "flex",
    justifyContent: "center",
  },
  links: {
    display: "flex",
    justifyContent: "space-between",
    width: "7%",
    cursor: "pointer",
  },

  appbarTitle: {
    fontFamily: "Zilla Slab",
    cursor: "pointer",
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("xl")]: {
      marginBottom: "1.4em",
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color='secondary'>
        <Toolbar className={classes.Toolbar}>
          <Typography className={classes.appbarTitle} variant="h4" onClick={() => router.push("/")}>
            Imoniu egzaminias darbas
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </div>
  );
}

export default Navbar;

