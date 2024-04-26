const mongoose = require("mongoose");
// Schema
const reviewSchema = new mongoose.Schema({
 AccountNumber: {
        type: String,
        required: true,
        max: 255,
        imutable: true,
 },
  name: {
    type: String,
    required: true,
    imutable: true,
    Unique: true,
  },
  review:{
    type: String,
    required: true,
  }
});

const Review = mongoose.model("Review", reviewSchema);

exports.Review = Review;