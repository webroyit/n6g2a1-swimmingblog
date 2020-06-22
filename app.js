const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server running in ${PORT}`));