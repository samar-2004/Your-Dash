const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Done'], default: 'Pending' }
});

module.exports = mongoose.model('Reminder', ReminderSchema);