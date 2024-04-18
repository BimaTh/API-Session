const mongoose = require('mongoose');
const users = require('./routers/users')
const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors package

mongoose.connect('mongodb+srv://application:46o9bQaYkBsf4q8p@users.z9pkksv.mongodb.net/?retryWrites=true&w=majority&appName=Users')
  .then(() => console.log('Connected to MongoDB...'))

app.use(express.json());
app.use(cors());
app.use('/api/users', users)


const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server
console.log("Hello World")