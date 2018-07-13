require('dotenv').config();
const config = require('./config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes');
const mongoose = require('mongoose');

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

// Add Middlewares
app.use(jsonParser);
app.use(urlencodedParser);
app.use(express.static(PUBLIC));

// Routes
app.use('/api/', router);
app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC, 'index.html'));
});

// Boot up the server
app.listen(PORT, () => {
  console.log('server is listening at port ' + PORT);
});
