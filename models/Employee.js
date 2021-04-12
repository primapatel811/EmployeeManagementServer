const mongoose = require('mongoose');

//schema
const EmployeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  salary: {
    type: String,
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
