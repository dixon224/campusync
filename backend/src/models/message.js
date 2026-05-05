import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    type: { type: String, enum: ["direct", "notification"], default: "direct" },
    content: String,
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);
export default mongoose.model("message", schema);
