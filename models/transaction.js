const mongoose = require("mongoose");

// schema
const AccountTransactions = new mongoose.Schema({
  AccountNumber: {
    type: String,
    required: true,
    max: 255,
    imutable: true,
  },
  Reciever: {
    type: String,
    required: true,
    max: 255,
    imutable: true,
  },
  TransactionAmount: {
    type: Number,
    required: true,
    imutable: true,
  },
  TransactionDate: {
    type: Date,
    default: Date.now,
    imutable: true,
  },
});

module.exports = mongoose.model("transactions", AccountTransactions);
