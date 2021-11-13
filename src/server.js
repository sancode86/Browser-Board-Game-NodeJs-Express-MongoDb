const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const {url} = require('./config/database');
const { appendFileSync } = require('fs');

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

require('./config/passport')(passport);

//parametros
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
secret:'jhb234fn942n249jwf99999323nf33a',
resave: false,
saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routes
require('./app/routes')(app, passport);

//Statics !
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), ()=>{
console.log('Server on port', app.get('port'));
console.log("---- Creatures Of Unknown Worlds ----")
});