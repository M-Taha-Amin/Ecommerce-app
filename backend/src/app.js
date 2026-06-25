const express = require('express');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const config = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(config.api.prefix, productRoutes);
app.use(config.api.prefix, reviewRoutes);
app.use(config.api.prefix, authRoutes);
app.use(config.api.prefix, userRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ message: 'works' });
});

module.exports = app;
