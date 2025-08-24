const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  password: { type: String, required: true },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' }
});

module.exports = mongoose.model('User', UserSchema);