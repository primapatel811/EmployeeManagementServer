const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const employeeRoutes = require('./routes/api/employeeRoutes-DB');
const contactRoutes = require('./routes/api/contactRoute');
const projectRoutes = require('./routes/api/projectRoute');
const userRoute = require('./routes/api/userRoute');
const authRoute = require('./routes/api/authRoute');

const app = express();

connectDB();

//set a middleware to parse data
app.use(express.json());
app.use(cors());

app.use('/api/employees', employeeRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log('server started');
});
