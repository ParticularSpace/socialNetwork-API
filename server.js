const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

// Import routes
const userRoutes = require('./routes/users');
const thoughtRoutes = require('./routes/thoughts');

const app = express();

mongoose.connect(config.db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.listen(config.port, () => console.log(`🌍 Connected on localhost:${config.port}`));
