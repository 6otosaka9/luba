const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000 || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

// Global Variables
app.use((req, res, next) => {
    next();
})

// Routes
app.use(require('./routes'));
app.use(require('./routes/autentications'));
app.use('/users', require('./routes/users'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the Server
app.listen(app.get('port'), () => {
    console.log("Server in port " + app.get('port'));
});