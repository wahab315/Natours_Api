const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getSingleTour)
  .delete(tourController.deleteSingleTour)
  .patch(tourController.updateSingleTour);

module.exports = router;
