const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bookController = require('./controllers/bookcontroller');
const app = express();
const PORT = 3000;

app.use(express.json());


const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

app.get('/', (req, res) => {
    res.send('Welcome to Book Haven!');
});

