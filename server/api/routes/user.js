const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const UserController = require('../controllers/userController');

router.route('/:username')
  .get(UserController.getUserProfile);

module.exports = router;