const mongoose = require('mongoose');
const config = require('config');

const dbcon = config.get('MongoDBConnection');

const connectDB = async () => {
  try {
    await mongoose.connect(dbcon, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('database connected');
  } catch (err) {
    console.log('unable to connect');
  }
};

module.exports = connectDB;
