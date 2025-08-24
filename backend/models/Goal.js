const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  progress: { type: Number, default: 0 },
  options: [{ name: String, percent: Number }]
});

module.exports = mongoose.model('Goal', GoalSchema);