const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true
}));

// Routes
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Save user to MongoDB
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Check if username exists in MongoDB
  // Compare hashed password
  // Set session
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
