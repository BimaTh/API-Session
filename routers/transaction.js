const express = require("express");
const lodash = require("lodash");
const transaction = require("../models/transaction");
const balance = require("../models/balance");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/create", auth ,  async (req, res) => {
  let br = await balance.findOne({ AccountNumber: req.user._id });
  if (!br) return res.status(400).send("No Data found.");
  if (br.Balance < req.body.TransactionAmount) {
    return res.status(400).send("Insufficient Balance.");
  }
  br.Balance = br.Balance - req.body.TransactionAmount
  let tr = new transaction({
    AccountNumber: req.user._id,
    Reciever: req.body.account,
    RecieverName: req.body.RecieverName,
    TransactionAmount: req.body.TransactionAmount,
  });
  await tr.save();
  await br.save();
  
  res.send(lodash.pick(tr, "AccountNumber", "Reciever", "RecieverName", "TransactionAmount", "TransactionDate"));
});

router.get("/fetch", auth ,  async (req, res) => {
    let tr = await transaction.find({ AccountNumber: req.user._id });
    if (!tr) return res.status(400).send("No transactions found.");
    res.status(200).json(tr);
});



module.exports = router;
