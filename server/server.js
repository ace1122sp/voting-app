require('dotenv').config();
const config = require('./config');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const router = require('./routes');
const User = require('./models/user');

// Initialize
const PUBLIC = path.resolve('voting-app', '../dist/');
const PORT = process.env.PORT || 3000;
const MONGO_URL = `mongodb://${config.db.host}:${config.db.port}/voting-app`;
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

// Set up database connection 
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL)
  .catch(error => {
    console.error(error.message);
    process.exit(1);
  });

// passport setup
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password)
      .then(res => {
        if (!res) return done(null, false);
        return done(null, user);
      })
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, doc) => {
    done(null, doc);
  });
});

// enable access to SPA
const enableSPAtoAccess = (req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, PATCH");
  next();
}

// Add Middlewares
app.use(jsonParser);
app.use(urlencodedParser);
app.use(express.static(PUBLIC));
app.use(morgan('dev'));
app.use(enableSPAtoAccess);

app.use(session({
  // secret: process.env.SESSION_SECRET,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('something broken');
});

// Routes
app.use('/api/', router);
app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC, 'index.html'));
});

// Boot up the server
app.listen(PORT, () => {
  console.log('server is listening at port ' + PORT);
});
