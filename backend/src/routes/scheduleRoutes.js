import { Router } from "express";
import schedule from "../models/schedule.js";
import { auth, adminOnly } from "./auth.js";
const r = Router();
r.get("/", auth, async (req, res) =>
  res.json(await schedule.find().sort({ startTime: 1 })),
);
r.post("/", auth, adminOnly, async (req, res) =>
  res.json(await schedule.create({ ...req.body, createdBy: req.user.id })),
);
r.put("/:id", auth, adminOnly, async (req, res) =>
  res.json(
    await schedule.findByIdAndUpdate(req.params.id, req.body, { new: true }),
  ),
);
r.delete("/:id", auth, adminOnly, async (req, res) =>
  res.json(await schedule.findByIdAndDelete(req.params.id)),
);
export default r;
