// server/models/Stock.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Stock', StockSchema);
