import mongoose from "mongoose";

const Todoschema = new mongoose.Schema(
  {
    content: {
      type: String,
      reuqired: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, //reference
      ref: "User", // enter the model name inside the mongoose.model
    },
    subtodos: [
      // array of sub todos type is array for subtodos
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo",
      },
    ],
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", Todoschema);
// todos will be name stored in database in lower case
