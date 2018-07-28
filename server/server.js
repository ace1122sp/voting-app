require('dotenv').config();
const config = require('./config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes');
const mongoose = require('mongoose');
const User = require('./models/user');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

// Initialize
const PUBLIC = path.resolve('voting-app', '../dist/');
const PORT = process.env.PORT || 3000;
const MONGO_URL = `mongodb://${config.db.host}:${config.db.port}/voting-app`;
const LocalStrategy = require('passport-local').Strategy;
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

// // passport setup
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    if (user.password !== password) return done(null, false);    
    return done(null, user);
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

// Add Middlewares
app.use(jsonParser);
app.use(urlencodedParser);
app.use(express.static(PUBLIC));
app.use(morgan('dev'));

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

// temporary authenticate check middleware
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/temp'); // if not authenticated
}

// temporary registration of new user
app.route('/temp/register')
  .get((req, res) => {
    res.sendFile(path.resolve(__dirname, './register.html'));
  })
  .post((req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        next(err);
      } else if (user) {
        res.redirect('/temp');
      } else {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email
        });

        newUser.save((err, doc) => {
          if (err) {
            res.redirect('/temp');
          } else {
            next(null, doc);
          }
        });
      }
    });
  }, passport.authenticate('local', { failureRedirect: '/temp' }), (req, res) => {
    res.redirect('/temp/profile');
  });

// temporary test auth routes
app.route('/temp/login')
  .get((req, res) => {
    res.sendFile(path.resolve(__dirname, './login.html'));
  })
  .post(passport.authenticate('local', { failureRedirect: '/temp' }), (req, res) => {
    res.redirect('/temp/profile');
  });

app.route('/temp/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/temp');
  });

app.route('/temp/profile')
  .get(ensureAuthenticated, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'profile.html'));
  });

app.route('/temp')
  .get((req, res) => {
    res.send('this is temporary root page for auth testing...');
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
