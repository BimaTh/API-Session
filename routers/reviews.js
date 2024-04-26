const express = require("express");
const lodash = require("lodash");
const { Review } = require("../models/reviews");
const { User } = require("../models/users");
const auth = require("../middleware/auth");
const router = express.Router();
require('dotenv').config();


router.post("/create", auth, async (req, res) => {
let user = await User.findById(req.user._id);
if (!user) return res.status(400).send("Invalid email or password.");
  let review = new Review({
    AccountNumber: req.user._id,
    name: req.body.name,
    review: req.body.review,
  });

  await review.save();
  res.send(lodash.pick(review, "name", "review"));
});

router.get('/fetch', async (req, res) => {
    
      // Fetch all reviews with user names
      const reviewsWithUserNames = await Review.find();
      if (!reviewsWithUserNames) return res.status(400).send("Error fetching reviews.");
      res.status(200).json(reviewsWithUserNames);
   
  });

module.exports = router;