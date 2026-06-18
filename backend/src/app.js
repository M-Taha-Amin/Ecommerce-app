const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'works' });
});

module.exports = app;