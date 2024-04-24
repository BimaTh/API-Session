const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { nanoid, customAlphabet } = require('nanoid');

const CardNumber = customAlphabet('1234567890', 16);

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: () => nanoid(20),
    index: { unique: true },
    unique: true,
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  card: {
    type: Number,
    required: true,
    default: () => CardNumber(16),
    index: { unique: true },
    unique: true,
    imuatable: true,
  },
  //products: [productSchema]
});

const User = mongoose.model("User", userSchema);



function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateU = validateUser;
