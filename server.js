const express = require('express');
const mongoose = require('mongoose');


const app = express();


const PORT = process.env.PORT || 3001;


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

// Start the server and have it listen on the specified port
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
