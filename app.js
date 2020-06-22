const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');

connectDB();

const app = express();

// For logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Use Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server running in ${PORT}`));