const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const mongoose = require('mongoose');

const login = require('./middleware/auth/login');
const signup = require('./middleware/auth/signup');
const profile = require('./middleware/auth/profile');

const transactionPost = require('./middleware/transaction/transactionPost');
const transactionGet = require('./middleware/transaction/transactionGet');
 
const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'https://money-tracker-adv.vercel.app',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

// Test the server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route for authentication
app.use('/api', login);
app.use('/api', signup);
app.use('/api', profile)

//Route for transaction
app.use('/api', transactionPost)
app.use('/api', transactionGet)

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
