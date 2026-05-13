import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import cookieParser from "cookie-parser";

import { createClient } from 'redis';
export const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Error:', err));
const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Congratulations! You have successfully connected to Redis!');
    } catch (err) {
        console.error('Could not connect to Redis:', err);
    }
};
connectRedis();

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

app.use("/api/classes", classRoutes);
//console.log("Mongo URI exists:", !!process.env.MONGO_URI);

connectDB().then(() => app.listen(process.env.PORT || 5000));
