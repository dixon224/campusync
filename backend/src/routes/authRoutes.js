import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import _class from "../models/class.js";
import schedule from "../models/schedule.js";
const r = Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

const toAuthUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
});

r.post("/register", upload.single("profileImage"), async (req, res) => {
  const { name, email, password, role, npm } = req.body;
  let profileImage = {};

  if (req.file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "campusync/users",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    profileImage = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }
  const exists = await user.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });
  const hash = await bcrypt.hash(password, 10);
  const u = await user.create({
    name,
    email,
    password: hash,
    role,
    npm,
    profileImage,
  });

  return res.json("User Successfully added");
});

r.post("/login", async (req, res) => {
  const { email, npm, password, role } = req.body;
  const u = await user.findOne(role === "student" ? { npm } : { email });
  if (!u) return res.status(400).json({ message: "User not found" });
  if (u.role != role) res.status(400).json({ message: "Roles do not match" });
  const ok = await bcrypt.compare(password, u.password);
  if (!ok) return res.status(400).json({ message: "Wrong password" });
  const token = jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.json({ user: toAuthUser(u) });
});

r.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const u = await user.findById(decoded.id).select("-password");

    if (!u) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user: u });
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

r.get("/teachers", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await user.findById(decoded.id).select("-password");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.role === "student" || currentUser.role === "teacher") {
      return res
        .status(403)
        .json({ message: "Only an admin can retreive all teachers" });
    }

    const teachers = await user.find({ role: "teacher" }).select("-password");

    if (teachers.length === 0) {
      return res.status(404).json({ message: "No teachers found" });
    }
    return res.json({ teachers });
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

r.get("/students", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await user.findById(decoded.id).select("-password");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.role === "student") {
      return res
        .status(403)
        .json({ message: "Only an admin can retreive all students" });
    }

    const students = await user.find({ role: "student" }).select("-password");

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }
    return res.json({ students });
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

r.get("/my_schedules", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await user.findById(decoded.id).select("-password");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = currentUser.id;

    const classes = await _class
      .find({
        students: userId,
      })
      .select("_id name");

    const classIds = classes.map((c) => c._id);

    const schedules = await schedule
      .find({
        class: { $in: classIds },
      })
      .populate("class", "name")
      .populate("teacher", "name")
      .sort({ startTime: 1 });

    res.status(200).json({
      success: true,
      schedules,
    });
  } catch (error) {
    console.error("Get student schedules error:", error);

    res.status(500).json({
      success: false,
      message: "Server error or Invalid or expired token",
    });
  }
});

r.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);
  return res.json({ message: "Logged out" });
});

export default r;
