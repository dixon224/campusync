import { redisClient } from "../server.js";
import { Router } from "express";
import Schedule from "../models/schedule.js";
import _class from "../models/class.js";
import { auth, teacherOrAdmin } from "../routes/auth.js";
const r = Router();

r.get("/", auth, async (req, res) => {
  const cacheKey = "all_schedules";
  try {
    const cachedSchedules = await redisClient.get(cacheKey);
    if (cachedSchedules) {
      console.log("Congratulations! Data retrieved from Redis cache!");
      return res.status(200).json({
        success: true,
        source: "Redis Cache",
        schedules: JSON.parse(cachedSchedules),
      });
    }
    const schedules = await Schedule.find()
      .populate("class", "name")
      .populate("teacher", "name email")
      .sort({ startTime: 1 });
    await redisClient.setEx(cacheKey, 600, JSON.stringify(schedules));
    console.log("Success! Data retrieved from MongoDB and saved to Redis!");
    res.status(200).json({
      success: true,
      source: "MongoDB Database",
      schedules,
    });
  } catch (err) {
    console.error("REDIS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

r.post("/", auth, teacherOrAdmin, async (req, res) => {
  try {
    const { classId, teacherId, description, classroom, startTime, endTime } =
      req.body;

    // 🔹 Validate required fields
    if (
      !classId ||
      !teacherId ||
      !description ||
      !classroom ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // // 🔹 Validate ObjectId format BEFORE querying
    // if (!classId.match(/^[0-9a-fA-F]{24}$/)) {
    //   return res.status(400).json({ message: "Invalid classId format" });
    // }

    // const cls = await Class.findById(classId);
    // if (!cls) {
    //   return res.status(404).json({ message: "Class not found" });
    // }

    // 🔹 Prevent duplicate schedule
    const exists = await Schedule.findOne({
      classroom,
      startTime,
      class: classId,
      teacher: teacherId,
    });
    if (exists) {
      return res.status(400).json({ message: "Schedule already exists" });
    }

    const schedule = await Schedule.create({
      class: classId,
      teacher: teacherId,
      description,
      classroom,
      startTime,
      endTime,
      createdBy: req.user.id,
    });
    await redisClient.del("all_schedules");
    console.log("Cache cleared! New schedule added.");
    return res.json({
      message: "A class was successfully scheduled",
    });
  } catch (err) {
    console.error("SCHEDULE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

r.put("/:id", auth, teacherOrAdmin, async (req, res) => {
  try {
    const sched = await Schedule.findById(req.params.id);

    if (!sched) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const {
      class: classId,
      teacher: teacherId,
      description,
      classroom,
      startTime,
      endTime,
    } = req.body;

    if (startTime && endTime && new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({
        message: "Start time must be before end time",
      });
    }

    if (classId !== undefined) sched.class = classId;
    if (teacherId !== undefined) sched.teacher = teacherId;
    if (description !== undefined) sched.description = description;
    if (classroom !== undefined) sched.classroom = classroom;
    if (startTime !== undefined) sched.startTime = startTime;
    if (endTime !== undefined) sched.endTime = endTime;

    const updatedSchedule = await sched.save();

    const populatedSchedule = await updatedSchedule.populate([
      { path: "class", select: "name" },
      { path: "teacher", select: "name" },
      { path: "createdBy", select: "name" },
    ]);

    await redisClient.del("all_schedules");
    console.log("Cache cleared! Schedule updated.");

    res.status(200).json({
      message: "Schedule updated successfully",
      schedule: populatedSchedule,
    });
  } catch (err) {
    console.error("Update schedule error:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// r.delete("/:id", auth, teacherOrAdmin, async (req, res) => {
//   const sched = await schedule.findById(req.params.id);
//   if (!sched) return res.status(404).json({ message: "Schedule not found" });
//   await sched.deleteOne();
//   res.json({ message: "Deleted" });
// });

export default r;
