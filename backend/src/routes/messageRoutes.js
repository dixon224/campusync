import { redisClient } from "../server.js";
import { Router } from "express";
import message from "../models/message.js";
import user from "../models/user.js";
import { auth, teacherOrAdmin } from "./auth.js";
const r = Router();

r.get("/", auth, async (req, res) =>
  res.json(
    await message
      .find({
        $or: [
          { recipient: req.user.id },
          { sender: req.user.id },
          { type: "notification" },
        ],
      })
      .sort({ createdAt: -1 }),
  ),
);

r.get("/inbox", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await message
      .find({
        recipients: userId,
      })
      .populate("sender", "name email role photo")
      .populate("recipients", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (err) {
    console.error("Get inbox error:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

r.get("/sent", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await message
      .find({
        sender: userId,
      })
      .populate("sender", "name")
      .populate("recipients", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (err) {
    console.error("Get sent messages error:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

r.post("/", auth, teacherOrAdmin, async (req, res) => {
  try {
    const { recipients, msg } = req.body;

    if (!msg || !recipients || recipients.length === 0) {
      return res.status(400).json({
        message: "Message and recipients are required",
      });
    }

    const sender = req.user.id;
    const senderRole = req.user.role;

    const users = await user.find({
      _id: { $in: recipients },
    });

    if (users.length !== recipients.length) {
      return res.status(404).json({
        message: "One or more recipients not found",
      });
    }

    if (senderRole === "admin") {
      const invalidRecipient = users.find(
        (u) => u.role !== "teacher" && u.role !== "student",
      );

      if (invalidRecipient) {
        return res.status(403).json({
          message: "Admin can only send messages to teachers or students",
        });
      }
    }

    if (senderRole === "teacher") {
      const invalidRecipient = users.find((u) => u.role !== "student");

      if (invalidRecipient) {
        return res.status(403).json({
          message: "Teachers can only send messages to students",
        });
      }
    }

    const newMessage = await message.create({
      sender,
      recipients,
      msg,
    });

    const populatedMessage = await newMessage.populate([
      { path: "sender", select: "name email role" },
      { path: "recipients", select: "name email role" },
    ]);
    await redisClient.publish("private_messages", JSON.stringify({
      message: "New private message sent!",
      recipientCount: recipients.length
    }));
    console.log("Congratulations! Private message alert sent via Redis!");
    res.status(201).json({
      message: "Message sent successfully",
      data: populatedMessage,
    });
  } catch (err) {
    console.error("Create message error:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
});
r.post("/notify", auth, teacherOrAdmin, async (req, res) => {
  try {
    const newNotification = await message.create({
      sender: req.user.id,
      content: req.body.content,
      type: "notification",
    });
    const payload = {
      event: "NEW_NOTIFICATION",
      content: req.body.content,
      sentBy: req.user.id,
      at: new Date()
    };
    
    await redisClient.publish("campus_notifications", JSON.stringify(payload));
    console.log("Congratulations! Real-time notification was published via Redis!");

    res.json(newNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default r;
