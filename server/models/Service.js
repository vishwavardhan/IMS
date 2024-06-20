// server/models/Service.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
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
  },
  trackingId: {
    type: String,
    required: true
  },
  attachment: {
    type: String
  }
});

module.exports = mongoose.model('Service', ServiceSchema);
