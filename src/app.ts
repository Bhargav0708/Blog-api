import express from "express";
import dotenv from "dotenv";
dotenv.config();
// const express = require("express");
import router from "./routes/auth.routes";
import postRouter from "./routes/post.routes";
import commentRouter from "./routes/comment.route";
import interactionRoute from "./routes/interaction.route";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use("/user", router);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/interaction", interactionRoute);
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`the server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start app:", error);
  }
};
start();
// "start": "nodemon src/index.ts"
//  "start": "npx ts-node --files src/index.ts"
