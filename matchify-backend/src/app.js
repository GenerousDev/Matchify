const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config');

const app = express();
const upload = multer({ dest: config.uploadPath });

// Configure CORS
app.use(cors({
  origin: config.corsOrigin
}));
app.use(express.json());

// In-memory storage (replace with actual database in production)
const users = new Map();
const profiles = new Map();

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// User registration
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (users.has(email)) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.set(email, hashedPassword);

    // Log the current state of users
    if (process.env.NODE_ENV !== 'production' || 'test' || 'development') {
        console.log('\nCurrent Users:');
        console.log('-------------');
        users.forEach((hash, email) => {
        console.log(`Email: ${email}`);
        console.log(`Hashed Password: ${hash}\n`);
        });
    }

  res.status(201).json({ message: 'User registered successfully' });
});

// User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const hashedPassword = users.get(email);
  if (!hashedPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: '24h' });
  res.json({ token });
});

// Profile creation
app.post('/api/profiles', authenticateToken, upload.single('profilePicture'), (req, res) => {
  const { name, age, gender, location, interests } = req.body;
  const email = req.user.email;

  // Validate required fields
  if (!name || !age || !gender || !location || !interests) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate age
  const parsedAge = parseInt(age);
  if (isNaN(parsedAge) || parsedAge < 18) {
    return res.status(400).json({ error: 'Age must be 18 or older' });
  }

  // Create profile
  const profile = {
    name,
    age: parsedAge,
    gender,
    location,
    interests: interests.split(',').map(i => i.trim()),
    profilePicture: req.file ? req.file.path : null,
    email
  };

  profiles.set(email, profile);

    // Log the current state of profiles
    if (process.env.NODE_ENV !== 'production' || 'test' || 'development') {
        console.log('\nCurrent Profiles:');
        console.log('----------------');
        profiles.forEach((profile, email) => {
          console.log(`\nEmail: ${email}`);
          console.log('Profile:', JSON.stringify(profile, null, 2));
        });
      }
    
  res.status(201).json(profile);
});

// Get profile
app.get('/api/profiles/:email', authenticateToken, (req, res) => {
  const profile = profiles.get(req.params.email);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(profile);
});

module.exports = app;