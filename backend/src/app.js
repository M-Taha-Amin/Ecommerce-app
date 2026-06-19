const express = require('express');
const productRoutes = require('./routes/productRoutes');
const config = require('./config');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use(config.api.prefix, productRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ message: 'works' });
});

module.exports = app;
