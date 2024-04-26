const express = require("express");
const lodash = require("lodash");
const transaction = require("../models/transaction");
const balance = require("../models/balance");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/create", auth, async (req, res, next) => {
  let sender = await balance.findOne({ AccountNumber: req.user._id });
  let totalExpenses = sender.totalExpenses;
  let finalExpenses = parseInt(totalExpenses) + parseInt(req.body.TransactionAmount)
  if (!sender) return res.status(400).json({ error: "User not found." });

  if (req.body.TransactionAmount < 0) {
    return res.status(400).json({ error: "Invalid amount." });
  }
  if (Math.abs(sender.Balance) < Math.abs(req.body.TransactionAmount)) {
    return res.status(400).json({ error: "Insufficient funds." });
  }
  if (sender.MonthlyLimit !== -1) {
    if(sender.MonthlyLimit < finalExpenses){
      return res.status(400).json({ error: "Exceeded monthly limit." });
    }
    // if (Math.abs(sender.MonthlyLimit) < Math.abs(req.body.TransactionAmount)) {
    //   return res.status(400).json({ error: "Exceeded monthly limit." });
    // }
  }
  let tr = new transaction({
    AccountNumber: req.user._id,
    cardNumber: req.body.card,
    Reciever: req.body.account ,
    RecieverName: req.body.RecieverName,
    TransactionAmount: req.body.TransactionAmount,
  });

  switch (req.body.type) {
    case "pay":
      tr.TransactionType = "Payment";
      sender.Balance -= Math.abs(req.body.TransactionAmount);
      sender.totalExpenses += Math.abs(req.body.TransactionAmount);
      await sender.save();
      break;

    case "transfer":
      tr.TransactionType = "Transfer";
      sender.Balance -= Math.abs(req.body.TransactionAmount);
      sender.totalExpenses += Math.abs(req.body.TransactionAmount);
      await sender.save();
      let reciever = await balance.findOne({ AccountNumber: req.body.account });
      if (!reciever) return res.status(400).json({ error: "Receiver not found." });
      reciever.Balance += Math.abs(req.body.TransactionAmount);
      await reciever.save();
      break;

    case "withdraw":
      tr.TransactionType = "Withdraw";
      sender.Balance -= Math.abs(req.body.TransactionAmount);
      sender.totalExpenses += Math.abs(req.body.TransactionAmount);
      await sender.save();
      break;
    default:
      tr.TransactionType = "Unknown";
  }

  await tr.save();

  res.send(
    lodash.pick(
      tr,
      "AccountNumber",
      "Reciever",
      "RecieverName",
      "TransactionAmount",
      "TransactionDate",
      "cardNumber",
      "TransactionType"
    )
  );
});

router.get("/fetch", auth, async (req, res) => {
  let tr = await transaction.find({ AccountNumber: req.user._id });
  if (!tr) return res.status(400).send("No transactions found.");
  res.status(200).json(tr);
});

module.exports = router;
