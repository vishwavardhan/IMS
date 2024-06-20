// server/models/Project.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  inventory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory'
  }]
});

module.exports = mongoose.model('Project', ProjectSchema);

