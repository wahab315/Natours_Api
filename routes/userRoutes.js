const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/sign-up').post(authController.signUp);
router.route('/sign-in').post(authController.signIn);

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').post(authController.resetPassword);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getSingleUser)
  .delete(userController.deleteSingleUser)
  .patch(userController.updateSingleUser);

module.exports = router;
