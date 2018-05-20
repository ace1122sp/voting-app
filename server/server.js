const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PUBLIC = path.resolve('voting-app', '../dist/');

const app = express();

// Initialize
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

// Add Middlewares
app.use(urlencodedParser);
app.use(jsonParser);
app.use(express.static(PUBLIC));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(PUBLIC, 'index.html'));
});

// Boot up the server
app.listen('3000', () => {
  console.log('server is listening at port 3000');
});
