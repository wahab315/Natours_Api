const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plain/:year').get(tourController.getMonthlyPlain);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getSingleTour)
  .delete(
    authController.protected,
    authController.ristrictTo('admin', 'lead-guide'),
    tourController.deleteSingleTour
  )
  .patch(tourController.updateSingleTour);

module.exports = router;
