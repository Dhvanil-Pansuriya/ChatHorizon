import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import getUserDetailFromToken from "../helper/getUserDetailFromToken.js";
import { User } from "../models/user.model.js";
import { instrument } from "@socket.io/admin-ui";

const app = express();

dotenv.config({
  path: "./.env",
});
/** Socket Connections.... */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL, "https://admin.socket.io"],
    credentials: true,
  },
});

const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("Connected User : ", socket.id);

  const token = socket.handshake.auth.token;

  const user = await getUserDetailFromToken(token);

  socket.join(user?._id);
  onlineUser.add(user?._id?.toString());

  io.emit("onlineUser", Array.from(onlineUser));
  // console.log("User ID : ", user?._id.toString());

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

  /** NewMessage */

  socket.on("NewMessage", (data) => {
    console.log("New Message : ", data);
  });

  /**Socket Disconnection */
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("Disconnected User : ", socket.id);
  });
});

instrument(io, { auth: false });

export { app, server };
