import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    description: String,
    classroom: String,
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true },
);
export default mongoose.model("schedule", schema);
