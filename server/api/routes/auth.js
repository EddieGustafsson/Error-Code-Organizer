const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const UserController = require('../controllers/userController');

router.route('/login')
  .post(UserController.loginUser);

router.route('/register')
  .post(UserController.registerUser);

router.route('/user')
  .get(auth, UserController.getUser);

router.route('/user/profile/:username')
  .get(UserController.getUserProfile);

module.exports = router;