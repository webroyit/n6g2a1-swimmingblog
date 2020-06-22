const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

connectDB();

const app = express();

// For logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server running in ${PORT}`));