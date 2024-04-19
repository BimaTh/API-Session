const mongoose = require("mongoose");
const users = require("./routers/users");
const transaction = require("./routers/transaction");
const balance = require("./routers/balance");
const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors package
const auth = require("./middleware/auth");
require('dotenv').config()

process.on('warning', (warning) => {
  console.log(warning.stack);
});

mongoose
  .connect(
    process.env.URI
  )
  .then(() => console.log("Connected to MongoDB..."));

app.use(express.json());
app.use(cors());
app.use("/api/users", users);
app.use("/api/transactions", transaction);
app.use("/api/balance", balance);

app.post("/api/auth", auth ,  async (req, res) => {
  res.status(200);
});


app.post("/api/ping", auth, async(req, res) => {
  res.status(200);
})

const port = process.env.PORT || 8080;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
