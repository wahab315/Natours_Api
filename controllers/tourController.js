const fs = require('fs');
const Tour = require('../models/tourModels');

exports.checkID = (req, res, next, val) => {
  // const tour = tours.find((el) => el.id === req.params.id * 1);
  // if (!tour) {
  //   return res.status(404).json({ status: "Error", message: "Invalid ID" });
  // }
  // next();
};

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Data not found!',
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data send!',
    });
  }
};

exports.getSingleTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    console.log(tour);
    res.status(200).json({ status: 'success', data: tour });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid id!',
    });
  }
};

exports.updateSingleTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid id!',
    });
  }
};

exports.deleteSingleTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
      message: 'Tour deleted successfully',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid id!',
    });
  }
};
