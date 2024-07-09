const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const mongoose = require('mongoose');

const login = require('./middleware/auth/login');
const signUp = require('./middleware/auth/signUp');
const profile = require('./middleware/auth/profile');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
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

app.use('/api', login);
app.use('/api', signUp);
app.use('/api', profile)

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
