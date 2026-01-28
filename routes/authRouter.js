import express from "express";
import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { user } = req.body;
  const newuser = await pool.query(
    "SELECT password_hash, id, username FROM users WHERE email=$1;",
    [user.email],
  );
  const dbuser = newuser.rows[0];
  const comparePass = await bcrypt.compare(user.password, dbuser.password_hash);
  const accesstoken = jwt.sign(
    { id: dbuser.username, email: dbuser.email },
    "JWT_SECRET",
    { expiresIn: "10m" },
  );
  const refreshToken = jwt.sign(
    { id: dbuser.id, email: dbuser.email },
    "REFRESH_SECRET",
    { expiresIn: "30d" },
  );
  await pool.query(
    "UPDATE users SET refresh_token= $1, access_token=$2 WHERE id =$3",
    [refreshToken, accesstoken, dbuser.id],
  );
  res.status(201).json({ comparePass, dbuser });
});

router.post("/signup", async (req, res) => {
  const { user } = req.body;
  const hasedPass = await bcrypt.hash(user.password, 10);
  const newuser = await pool.query(
    "INSERT INTO users (username,email,password_hash) VALUES ($1, $2, $3) RETURNING id, email",
    [user.name, user.email, hasedPass],
  );
  res.status(201).json(newuser.rows[0]);
});

export default router;
