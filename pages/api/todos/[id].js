import todoModel from "../../../models/todo";
import { dbConnect } from "../../../utils/dbConnect";

const id = async (req, res) => {
  const { method } = req;
  const id = req.query.id;
  dbConnect();

  switch (method) {
    case "PUT":
      try {
        const body = await JSON.parse(req.body);
        console.log("REEE BODY: ", body.name, body.completed);
        const updatedTodo = await todoModel.findByIdAndUpdate(id, { name: body.name, completed: body.completed });

        return res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
        });
      }

    case "DELETE":
      try {
        await todoModel.findByIdAndRemove(id);
        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    default:
      res.setHeaders("Allow", ["DELETE", "PUT"]);
      return res.status(405).json({ success: false }).end(`Method ${method} Not Allowed`);
  }
};

export default id;
