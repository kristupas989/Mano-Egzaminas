//react
import { useState } from "react";
//next
import { useRouter } from "next/router";
//material ui
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
//helper functions
import { getAllTodos, getTodoById } from "../../helper";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const completedValues = [
  {
    value: true,
    label: "true",
  },
  {
    value: false,
    label: "false",
  },
];

function Todo({ todo }) {
  const classes = useStyles();
  const router = useRouter();
  const [name, setName] = useState(todo.name);
  const [completed, setCompleted] = useState(todo.completed);

  const editTodoSubmit = () => {
    fetch(`/api/todos/${todo._id}`, { method: "PUT", body: JSON.stringify({ name: name, completed: completed }) }).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        router.push("/todos");
      } else {
        alert("Failed to update");
      }
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Typography color="secondary" variant="h4" align="center">
        Pakeisti imone
      </Typography>

      <TextField id="standard-basic" label="Imones pavadinimas" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField id="standard-select-currency" select label="Gera imone" value={completed} onChange={(e) => setCompleted(e.target.value)}>
        {completedValues.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" color="primary" onClick={editTodoSubmit}>
        Pakeisti
      </Button>
    </form>
  );
}

export const getStaticPaths = async () => {
  let todos = await getAllTodos();

  const paths = todos.map((todo) => {
    return {
      params: { id: todo._id.toString() }, //MongoDb will return id as [object, object], so we convert it to string
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const todo = await getTodoById(id);

  return {
    props: {
      todo: {
        _id: todo._id.toString(), //MongoDb will return id as [object, object], so we map through every todo and  convert id to string
        name: todo.name,
        completed: todo.completed,
      },
    },
  };
};

export default Todo;
