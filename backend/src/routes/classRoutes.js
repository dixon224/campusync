import { Router } from "express";
import jwt from "jsonwebtoken";
import _class from "../models/class.js";
import user from "../models/user.js";
import { auth, teacherOrAdmin } from "./auth.js";
const r = Router();

// Create class (Admin/Teacher only)
r.post("/", auth, teacherOrAdmin, async (req, res) => {
  const { name, teacherIds, studentIds } = req.body;
  if (!name || teacherIds.length == 0 || studentIds.length == 0) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const exists = await _class.findOne({ name });
  if (exists) return res.status(400).json({ message: "Class already exists" });
  const teachers = await user.find({
    _id: { $in: teacherIds },
    role: "teacher",
  });

  if (teachers.length !== teacherIds.length) {
    return res
      .status(400)
      .json({ message: "One or more teachers are invalid" });
  }

  const students = await user.find({
    _id: { $in: studentIds },
    role: "student",
  });

  if (students.length !== studentIds.length) {
    return res
      .status(400)
      .json({ message: "One or more students are invalid" });
  }

  const c = await _class.create({
    name,
    teachers: teacherIds,
    students: studentIds,
  });

  return res.json(c);
});

// Student joins class
r.post("/join", auth, async (req, res) => {
  try {
    const { classIds } = req.body;

    if (!classIds || classIds.length === 0) {
      return res.status(400).json({
        message: "No classes selected",
      });
    }

    const classes = await _class.find({
      _id: { $in: classIds },
    });

    if (classes.length === 0) {
      return res.status(404).json({
        message: "No class was found",
      });
    }

    const alreadyJoined = classes.some((singleClass) =>
      singleClass.students.some(
        (studentId) => studentId.toString() === req.user.id,
      ),
    );

    if (alreadyJoined) {
      return res.status(400).json({
        message: "Already joined one of these classes",
      });
    }

    await _class.updateMany(
      {
        _id: { $in: classIds },
      },
      {
        $addToSet: {
          students: req.user.id,
        },
      },
    );

    return res.json({
      message: "Classes successfully joined",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

r.get("/AllClasses", async (req, res) => {
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

    const classes = await _class.find().populate("teachers", "name email");

    if (classes.length === 0) {
      return res.status(404).json({ message: "No classes found" });
    }
    return res.json({ classes });
  } catch (err) {
    console.error("AllClasses error:", err);
    return res.status(500).json({ message: err.message });
  }
});

export default r;
