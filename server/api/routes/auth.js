const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

router.route('/login')
  .post(UserController.loginUser);

router.route('/register')
  .post(UserController.registerUser);

module.exports = router;