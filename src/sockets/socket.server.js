const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const aiService = require("../service/ai.service");
const ConversationModel = require("../models/converstion.model");
const { createMemory } = require("../service/vector.service");



async function authenticateSocket(socket, next) {
  try {
    const cookies = cookie.parse(socket?.request?.headers?.cookie || "");
    const token = cookies?.token;

    console.log("Socket Cookies:", cookies);
    if (!token) throw new Error("Missing token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);

    if (!user) throw new Error("User not found");

    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Authentication error"));
  }
}

function handleConnection(socket) {
  socket.on("ai-message", async (messagePayload) => {
    // console.log("Received message:", messagePayload);

    await ConversationModel.create({
      message: {
          sender: socket.user._id,
          content: messagePayload.message,
          chatId: messagePayload.chatId,
          },
          role: "user",
    });

const responseVector = await aiService.generateVector(messagePayload.message);

console.log("Response Vector:", responseVector);
    const conversationHistory = (await ConversationModel.find({ "message.chatId": messagePayload.chatId }).sort({ createdAt: -1 }).limit(5).lean()).reverse();


    await createMemory({
      vector: responseVector, 
      metadata: {
         userId: socket.user._id,
         Conversation : messagePayload.message
        },
        messageId: messagePayload.chatId,
       });

    try {
      const response = await aiService.generateResponse(conversationHistory.map(item =>{
      return {
         role: item.role, parts: [{ text: item.message.content }],
      };
    }));

    //    await ConversationModel.create({
    //   message: {
    //       sender: socket.user._id,
    //       content: response,
    //       chatId: messagePayload.chatId,
    //       },
    //       role: "model",
    // });

      socket.emit("ai-response", {
        message: response,
        chatId: messagePayload.chatId,
      });
    } catch (err) {
      socket.emit("ai-response", { message: "Error generating response" });
    }
  });
}

async function initSocketServer(httpServer) {
  const io = new Server(httpServer);

  io.use(authenticateSocket);
  io.on("connection", handleConnection);
}

module.exports = { initSocketServer };
