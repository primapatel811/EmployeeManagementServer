const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const employeeRoutes = require('./routes/api/employeeRoutes-DB');
const userRoute = require('./routes/api/userRoute');
const authRoute = require('./routes/api/authRoute');

const app = express();

connectDB();

//set a middleware to parse data
app.use(express.json());
app.use(cors());

app.use('/api/employees', employeeRoutes);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.listen(5001, () => {
  console.log('server started');
});
