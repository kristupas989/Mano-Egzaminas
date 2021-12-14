import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide todo name"],
  },
  completed: {
    type: Boolean,
  },
});

export default mongoose.models.todo || mongoose.model("todo", todoSchema);
//if we write only mongoose.model("todo", todoSchema) when we re-compile the code next js will throw "model already exist" error, so we add mongoose.models.todo
