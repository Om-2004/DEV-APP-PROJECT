const express = require('express');
const connectDB = require('./config/db');
const config = require('config');
const path = require('path');
require('dotenv').config();

const app = express();

// Initialise middleware
app.use(express.json({ extended: false }));

// Connect to database
connectDB();

// App routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//Serve static assets in production
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve React’s build output
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Handle React routing, return all requests to React app
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// ✅ Load port from config (with fallback)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
