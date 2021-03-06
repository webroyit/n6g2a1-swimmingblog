const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');

// Passport Config
require('./config/passport')(passport);

connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        
        return method;
    }
}));

// For logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Handlebars Helpers
const { formatDate, truncate, stripTags, editIcon, select } = require('./helpers/hbs');

// Use Handlebars
app.engine('.hbs', exphbs({helpers: {
    formatDate,
    truncate,
    stripTags,
    editIcon,
    select
},
    defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// Express Sessions Middleware
app.use(session({
    secret: 'swimming blog',
    resave: false,                  // Will not save session when there is no change
    saveUninitialized: false,       // Does not create session until someting is stored

    // Store the session in MongoDB
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global variable
app.use(function (req, res, next){
    res.locals.user = req.user || null;
    next();
})

// Static Folder
// __dirname for current directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server running in ${PORT}`));