const express = require("express");
const lodash = require("lodash");
const balance = require("../models/balance");
const auth = require("../middleware/auth");
const router = express.Router();


router.post("/add", auth, async (req, res) => {
  let user = await balance.findOne({ AccountNumber: req.user._id });
  if (user) {
    user.Balance += req.body.balance;
    await user.save();
    return res
      .status(200)
      .send(`Balance added successfully: New Balance: ${user.Balance}`);
  } else {
    let br = new balance({
      AccountNumber: req.user._id,
      Balance: req.body.balance,
      cardNumber: req.body.card,
    });
    await br.save();
    res.send(
      lodash.pick(
        br,
        "AccountNumber",
        "Balance",
        "UpdatedAt",
      )
    );
  }
});

router.post("/budget", auth, async (req, res) => {
  let user = await balance.findOne({ AccountNumber: req.user._id });
  if (user) {
    user.MonthlyLimit = req.body.limit;
    await user.save();
    return res
      .status(200)
      .send(`Budget set successfully: New Limit: ${user.MonthlyLimit}`);
  } else {
    let br = new balance({
      AccountNumber: req.user._id,
      MonthlyLimit: req.body.limit,
      cardNumber: req.body.card,
    });
    await br.save();
    res.send(
      lodash.pick(
        br,
        "AccountNumber",
        "MonthlyLimit",
        "UpdatedAt",
      )
    );
  }
});
router.post("/budgetrest", auth, async (req, res) => {
  let user = await balance.findOne({ AccountNumber: req.user._id });
  if (user) {
    user.MonthlyLimit = 0;
    await user.save();
    return res
      .status(200)
      .send(`Budget set successfully: New Limit: ${user.MonthlyLimit}`);
  } 
});

router.get("/fetch", auth, async (req, res) => {
  let br = await br.find({ AccountNumber: req.user._id });
  if (!br) return res.status(400).send("No Data found.");
  res.status(200).json(br);
});

module.exports = router;
