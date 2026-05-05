import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "CampusSync backend is running..." });
});

app.use("/api/auth", authRoutes);

app.use("/api/schedules", scheduleRoutes);

app.use("/api/messages", messageRoutes);

connectDB().then(() => app.listen(process.env.PORT || 5000));
