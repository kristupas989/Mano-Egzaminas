import todoModel from "../models/todo";
import { dbConnect } from "../utils/dbConnect";

export const getAllTodos = async () => {
  dbConnect();
  try {
    const todos = await todoModel.find();
    return todos;
  } catch (error) {
    console.log(error);
  }
};

export const getTodoById = async (id) => {
  dbConnect();
  try {
    const todo = await todoModel.findById(id);
    return todo;
  } catch (error) {
    console.log(error);
  }
};
