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
  RecieverName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
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
  cardNumber: {
    type: Number,
    required: true,
    imutable: true,
  },
  TransactionType: {
    type: String,
    required: true,
    imutable: true,
  },
});

module.exports = mongoose.model("transactions", AccountTransactions);
