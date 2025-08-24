const Reminder = require('../models/Reminder');

exports.getReminders = async (req, res) => {
  const reminders = await Reminder.find();
  res.json(reminders);
};

exports.createReminder = async (req, res) => {
  const reminder = new Reminder(req.body);
  await reminder.save();
  res.status(201).json(reminder);
};

exports.updateReminder = async (req, res) => {
  const reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(reminder);
};

exports.deleteReminder = async (req, res) => {
  await Reminder.findByIdAndDelete(req.params.id);
  res.status(204).end();
};