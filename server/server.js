// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const serviceRoutes = require('./routes/serviceRoutes');
const stockRoutes = require('./routes/stockRoutes');
const orderRoutes = require('./routes/orderRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/services', serviceRoutes);
app.use('/stocks', stockRoutes);
app.use('/orders', orderRoutes);
app.use('/projects', projectRoutes);

// Database Connection
const dbURI = 'mongodb://localhost:27017/inventory_management';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(5000, () => console.log('Server started on port 5000')))
  .catch(err => console.log(err));

module.exports = app;
