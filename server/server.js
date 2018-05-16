const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.end('hello world');
});

app.listen('3000', () => {
  console.log('server is listening at port 3000');
});