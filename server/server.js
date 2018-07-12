require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes');

// Initialize
const PUBLIC = path.resolve('voting-app', '../dist/');
const PORT = process.env.PORT || 3000;

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

// Add Middlewares
app.use(urlencodedParser);
app.use(jsonParser);
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
