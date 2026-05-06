import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "CampusSync backend is running..." });
});

app.use("/api/auth", authRoutes);

app.use("/api/schedules", scheduleRoutes);

app.use("/api/messages", messageRoutes);

connectDB().then(() => app.listen(process.env.PORT || 5000));
