const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  console.log('Error is from my side', err);
  const message = `Invalid ${err.path}: ${err.value}. `;
  const errorName = new AppError(message, 400);
  return errorName;
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
      err: err,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV == 'developement') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name == 'CastError') error = handleCastErrorDB(error);

    sendErrorProd(error, res);
  }
};
