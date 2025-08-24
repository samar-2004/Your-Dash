const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  participants: [String],
  status: { type: String, enum: ['Pending', 'Done'], default: 'Pending' }
});

module.exports = mongoose.model('Meeting', MeetingSchema);