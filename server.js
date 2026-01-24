const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { user } = req.body;
  console.log(user);
  res.send({ message: "Login successful" });
});

app.post("/signup", (req, res) => {
  console.log("inside sign up ");

  const { user } = req.body;
  console.log(user);
  res.send({ message: "Login successful" });
});

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
