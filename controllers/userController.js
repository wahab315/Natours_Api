const User = require('../models/userModels');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('./catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet.',
  });
};
exports.getSingleUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet.',
  });
};
exports.deleteSingleUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet.',
  });
};
exports.updateSingleUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet.',
  });
};
