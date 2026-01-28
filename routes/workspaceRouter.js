import express from "express";
import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/createworkspace" , async(req,res)=>{
    const {workspacename, userId} = req.body;
    const newworkspace = await pool.query(
    "INSERT INTO workspace (name, user_id) VALUES ($1, $2) RETURNING name, user_id",
    [workspacename, userId],
  );
  res.status(200).json(newworkspace.rows[0])

})

export default router;
