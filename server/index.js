import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/index.js";

dotenv.config({
  path: "./.env",
});

// const app = express();


app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "https://admin.socket.io"],
    credentials: true,
  })
);



app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
  response.json({
    message: "Server running at : " + PORT,
  });
});

// User Endpoint
app.use("/api", router);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server is running successfully at : http://localhost:" + PORT);
  });
});


