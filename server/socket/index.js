import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import getUserDetailFromToken from "../helper/getUserDetailFromToken.js";
import { User } from "../models/user.model.js";

const app = express();

dotenv.config({
  path: "./.env",
});
/** Socket Connections.... */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("Connected User : ", socket.id);

  const token = socket.handshake.auth.token;

  const user = await getUserDetailFromToken(token);
  // console.log("User : ", user);

  socket.join(user?._id);
  onlineUser.add(user?._id?.toString());

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("message-page", async (userId) => {
    const userDetail = await User.findById(userId).select("-password");

    const payload = {
      _id: userDetail?._id,
      name: userDetail?.name,
      email: userDetail?.email,
      profile_pic: userDetail?.profile_pic,
      online: onlineUser.has(userId),
    };

    socket.emit("message-user", payload);
  });

  /**Socket Disconnection */
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("Disconnected User : ", socket.id);
  });
});

export { app, server };
