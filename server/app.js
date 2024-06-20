// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stockRoutes = require('./routes/stockRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

mongoose.connect('mongodb://localhost/inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use('/api/stocks', stockRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;
