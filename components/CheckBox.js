//react
import { Fragment, useState } from "react";
//material ui
import Checkbox from "@material-ui/core/Checkbox";

function CheckBox({ todos, setTodos, id }) {
  const objIndex = todos.findIndex((obj) => obj._id === id);

  const [completed, setCompleted] = useState(todos[objIndex].completed);

  const handleChange = (event) => {
    setCompleted(event.target.checked);
  };

  const handleClick = () => {
    let newTodos = [...todos];
    newTodos[objIndex].completed = !completed;

    fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: newTodos[objIndex].name, completed: newTodos[objIndex].completed }),
    }).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        setTodos(newTodos);
      } else {
        alert("Failed to update");
      }
    });
  };
  return (
    <Fragment>
      <Checkbox
        onClick={handleClick}
        color="primary"
        checked={completed}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </Fragment>
  );
}

export default CheckBox;
