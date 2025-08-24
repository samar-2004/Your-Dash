const Meeting = require('../models/Meeting');

exports.getMeetings = async (req, res) => {
  const meetings = await Meeting.find();
  res.json(meetings);
};

exports.createMeeting = async (req, res) => {
  const meeting = new Meeting(req.body);
  await meeting.save();
  res.status(201).json(meeting);
};

exports.updateMeeting = async (req, res) => {
  const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(meeting);
};

exports.deleteMeeting = async (req, res) => {
  await Meeting.findByIdAndDelete(req.params.id);
  res.status(204).end();
};