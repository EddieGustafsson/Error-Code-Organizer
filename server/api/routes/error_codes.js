const express = require('express');
const router = express.Router();

const ErrorCodeController = require('../controllers/errorCodeController');

router.route('/:projectId')
    .get(ErrorCodeController.index);

module.exports = router;