const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  assignedBy: { type: String, required: true },
  status: { type: String, enum: ['In progress', 'Complete', 'Closed', 'New'], default: 'New' },
  progress: { type: Number, default: 0 },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Task', TaskSchema);