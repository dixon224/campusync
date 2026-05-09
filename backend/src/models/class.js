import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true },
);
export default mongoose.model("class", schema);
