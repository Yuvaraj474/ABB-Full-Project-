const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req, res) => {
  try {
      const { name, email, password, phone } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
          return res.status(400).json({ message: 'User already registered with this email' });
      }

      // Create a new nuser
      const user = new User({
          name,
          email,
          password,
          phone,
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the new user to the database
      await user.save();

      res.status(201).json({ message: 'user registered successfully!' });
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller method for user login
exports.loginUser = async(req, res) => {
  try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare passwords
      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (!passwordsMatch) {
          return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.status(200).json({user,token});
  } catch (error) {
      console.error('Error logging user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};