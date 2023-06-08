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
})
    .then(() => console.log('Successfully connected to the database'))
    .catch((err) => console.error('Error connecting to the database:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.listen(config.port, () => console.log(`Connected on http://localhost:${config.port}`));
