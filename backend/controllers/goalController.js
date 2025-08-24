const Goal = require('../models/Goal');

exports.getGoals = async (req, res) => {
  const goals = await Goal.find();
  res.json(goals);
};

exports.createGoal = async (req, res) => {
  const goal = new Goal(req.body);
  await goal.save();
  res.status(201).json(goal);
};

exports.updateGoal = async (req, res) => {
  const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(goal);
};

exports.deleteGoal = async (req, res) => {
  await Goal.findByIdAndDelete(req.params.id);
  res.status(204).end();
};