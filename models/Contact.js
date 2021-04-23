const mongoose = require('mongoose');

//schema
const ContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  subject: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Contact', ContactSchema);
