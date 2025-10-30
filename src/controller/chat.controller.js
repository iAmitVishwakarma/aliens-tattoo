const ChatModel = require("../models/chat.model");

async function createChat(req, res) {
  const { title } = req.body;
  const user = req.user;

console.log("Creating chat with title:", title, "and user:", user._id);
  try {
    const chat = await ChatModel.create({ title, user : user._id });
    return res.status(201).json({
        message: "Chat created successfully",
        chat:{
            id: chat._id,
            title: chat.title,
            user: chat.user,
            lastActivity: chat.lastActivity
        }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { createChat };
