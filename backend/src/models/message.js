import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    msg: String,
  },
  { timestamps: true },
);
export default mongoose.model("message", schema);
