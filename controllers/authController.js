const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const catchAsync = require('./catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    passwordChangedAt: req.body.passwordChangedAt,
  });

  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    newUser,
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide email and password.', 400);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError('Incorrect email and password.', 401);
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protected = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError(
      'You are not logged in! Please login to get access.',
      401
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    throw new AppError(
      'The user belonging to this token does no longer exist.',
      401
    );
  }

  if (currentUser.changePasswordAfter(decoded.iat)) {
    throw new AppError(
      'User recently changed password! Please login again.',
      401
    );
  }

  req.user = currentUser;

  next();
});
