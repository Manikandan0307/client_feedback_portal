const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this is correctly exported
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  console.log('Register endpoint hit'); // Log this
  try {
    const { username, email, password } = req.body;
    console.log('Received data:', req.body); // Log this
    const user = await User.findByEmail(email);
    if (user) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.createUser(username, email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err); // Log error details
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  console.log('Login endpoint hit'); // Log this
  try {
    const { email, password } = req.body;
    console.log('Received login data:', req.body); // Log this
    const user = await User.findByEmail(email);
    if (!user) {
      console.log('User not found'); // Log this
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials'); // Log this
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error logging in user:', err); // Log error details
    res.status(500).json({ message: 'Error logging in user' });
  }
});

module.exports = router; // Ensure this is exporting the router
