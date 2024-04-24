const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const lodash = require("lodash");
const { User, validateU } = require("../models/users");
const auth = require("../middleware/auth");
const router = express.Router();
require('dotenv').config();
const balance = require("../models/balance");

router.post("/create", async (req, res) => {
  // const { error } = validateU(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists.");

  user = new User({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  let br = new balance({
    AccountNumber: user._id,
    Balance: 5000,
    cardNumber: user.card,
  });
  await br.save();
  res.send(lodash.pick(user, "_id", "name", "email", "card"));
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (!user) return res.status(400).send("Invalid email or password.");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "15m" });
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from all origins
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
  );
  res.header("x-auth-token", token);
  res.status(200).json({ token: token });
});

router.get("/info", auth, async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("Invalid email or password.");
  res.status(200).json(user);
});

module.exports = router;
