const mongoose = require("mongoose");
// Schema
const balanceSchema = new mongoose.Schema({
  AccountNumber: {
    type: String,
    required: true,
    imutable: true,
    Unique: true,
  },
  cardNumber:{
    type: Number,
    required: true,
    imutable: true,
  },
  Balance: {
    type: Number,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
    imutable: true,
  },
  UpdatedAt: {
    type: Date,
    default: Date.now,
  },
  MonthlyLimit: {
    type: Number,
    default: -1,
  },
  totalExpenses: {
    type: Number,
    default: 0,
  }
});

// Events handler

balanceSchema.pre("save", function (next) {
  this.UpdatedAt = Date.now();
  next();
});

balanceSchema.pre("update", function (next) {
  this.UpdatedAt = Date.now();
  next();
});

module.exports = mongoose.model("balancaes", balanceSchema);
