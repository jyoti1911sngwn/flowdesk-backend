// server.js (ES Module style)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import workspaceRouter from "./routes/workspaceRouter.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/workspace", workspaceRouter);

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
