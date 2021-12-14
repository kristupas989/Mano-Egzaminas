import todoModel from "../../../models/todo";
import { dbConnect } from "../../../utils/dbConnect";

const index = async (req, res) => {
  const { method } = req;
  dbConnect();

  switch (method) {
    case "POST":
      try {
        let newTodo = await new todoModel(JSON.parse(req.body));
        newTodo.save();
        return res.status(201).json({
          success: true,
          data: newTodo,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
        });
      }

    default:
      res.setHeaders("Allow", ["POST"]);
      return res.status(405).json({ success: false }).end(`Method ${method} Not Allowed`);
  }
};

export default index;
