const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

// Passport Config
require('./config/passport')(passport);

connectDB();

const app = express();

// For logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Use Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// Express Sessions Middleware
app.use(session({
    secret: 'swimming blog',
    resave: false,                  // Will not save session when there is no change
    saveUninitialized: false,       // Does not create session until someting is stored
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
// __dirname for current directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server running in ${PORT}`));