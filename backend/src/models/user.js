import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    npm: { type: String, sparse: true, unique: true },
    //sparse because only the student as an NPM
    password: String,
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    profileImage: {
      url: String,
      publicId: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("user", schema);
