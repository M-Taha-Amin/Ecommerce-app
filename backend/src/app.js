const express = require('express');
const productRoutes = require('./routes/productRoutes');
const config = require('./config');

const app = express();

app.use(express.json());

app.use(config.api.prefix, productRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'works' });
});

module.exports = app;
