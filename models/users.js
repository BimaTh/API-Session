const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    //products: [productSchema]
})


const User = mongoose.model('User', userSchema)

const userJoiSchema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      products: Joi.required()
})





function validateUser(user) {
    const schema = {
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      /*products: Joi.array().items(
        Joi.object().keys({
            nameOfProduct: Joi.string().min(3).max(50).required(),
            quantity: Joi.number().required() 
        })
    ).required()*/
      
    };
  
    return Joi.validate(user, schema);
  }

  
  
  exports.User = User; 
  exports.validateU = validateUser;