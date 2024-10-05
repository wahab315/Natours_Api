const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globelErrorHandler = require('./controllers/errorController');
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});

app.use(globelErrorHandler);

// Routes

module.exports = app;
