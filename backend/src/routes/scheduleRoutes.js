import { Router } from "express";
import schedule from "../models/schedule.js";
import _class from "../models/class.js";
import { auth, teacherOrAdmin } from "../routes/auth.js";
const r = Router();

r.get("/", auth, async (req, res) => {
  const schedules = await schedule.find().populate("class");
  res.json(schedules);
});

r.post("/", auth, teacherOrAdmin, async (req, res) => {
  try {
    const { title, startTime, endTime, classId } = req.body;

    // 🔹 Validate required fields
    if (!title || !startTime || !endTime || !classId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔹 Validate ObjectId format BEFORE querying
    if (!classId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid classId format" });
    }

    const cls = await Class.findById(classId);
    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }

    // 🔹 Prevent duplicate schedule
    const exists = await Schedule.findOne({ title, startTime, class: classId });
    if (exists) {
      return res.status(400).json({ message: "Schedule already exists" });
    }

    const schedule = await Schedule.create({
      title,
      startTime,
      endTime,
      class: classId,
      createdBy: req.user.id,
    });

    res.json(schedule);
  } catch (err) {
    console.error("SCHEDULE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

r.put("/:id", auth, teacherOrAdmin, async (req, res) => {
  const sched = await schedule.findById(req.params.id);
  if (!sched) return res.status(404).json({ message: "Schedule not found" });
  Object.assign(sched, req.body);
  await sched.save();
  res.json(sched);
});

r.delete("/:id", auth, teacherOrAdmin, async (req, res) => {
  const sched = await schedule.findById(req.params.id);
  if (!sched) return res.status(404).json({ message: "Schedule not found" });
  await sched.deleteOne();
  res.json({ message: "Deleted" });
});

export default r;
