const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  message: {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  role: { type: String, enum: ["user", "model"], default: "user" },
});

const ConversationModel = mongoose.model("Conversation", conversationSchema);

module.exports = ConversationModel;