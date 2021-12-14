//react
import { useState } from "react";
//next
import Link from "next/link";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
//fetch
import fetch from "isomorphic-fetch";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "200px",
  },
  title: {
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function Home() {
  const [todoName, setTodoName] = useState("");
  const classes = useStyles();
  const createTodo = () => {
    if (todoName === "") {
      alert("Please provide todo name");
    } else {
      fetch("/api/todos", { method: "POST", body: JSON.stringify({ name: todoName, completed: false }) }).then((resp) => setTodoName(""));
    }
  };
  return (
    <div className={classes.root}>
      <form className={classes.form}>
        <Typography color="primary" variant="h4" className={classes.title}>
          Sukurti imone
        </Typography>
        <TextField id="standard-basic" label="Imones pavadinimas" value={todoName} onChange={(e) => setTodoName(e.target.value)} />
        <Button variant="contained" color="primary" onClick={createTodo}>
          Sukurti
        </Button>
        <Link href="/todos" passHref>
          <Button variant="contained" color="secondary">
            VISOS IMONES
          </Button>
        </Link>
      </form>
    </div>
  );
}
