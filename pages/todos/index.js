//react
import { useState } from "react";
//next
import { useRouter } from "next/router";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckBox from "../../components/CheckBox";

//helper functions
import { getAllTodos } from "../../helper";

//fetch
import fetch from "isomorphic-fetch";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "auto",
  },
  card: {
    margin: "5px",
    width: "280px",
    height: "130px",
  },
  action: {
    display: "flex",
    justifyContent: "center",
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function Index({ todosProp }) {
  const [todos, setTodos] = useState(todosProp || []);
  const classes = useStyles();
  const router = useRouter();

  const handleDelete = (deleteId) => {
    fetch(`/api/todos/${deleteId}`, { method: "DELETE" }).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        setTodos(todos.filter((todo) => todo._id !== deleteId));
      } else {
        alert("Failed to delete");
      }
    });
  };

  return (
    <div className={classes.root}>
      {todos.map((todo) => {
        return (
          <Card key={todo._id} className={classes.card}>
            <CardContent className={classes.content}>
              <Typography
                style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {todo.name}
              </Typography>
            </CardContent>
            <CardActions className={classes.action}>
              <CheckBox todos={todos} setTodos={setTodos} id={todo._id} />
              <Button variant="outlined" color="primary" onClick={() => router.push(`todos/${todo._id}`)}>
                Redaguoti
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleDelete(todo._id)}>
                Istrinti
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export const getServerSideProps = async () => {
  let todos = await getAllTodos();

  //MongoDb will return id as [object, object], so we map through every todo and  convert id to string
  return {
    props: {
      todosProp: todos.map((todo) => ({
        name: todo.name,
        completed: todo.completed,
        _id: todo._id.toString(),
      })),
    },
  };
};

export default Index;
