const express = require('express');
const router = express.Router();

const ErrorCodeController = require('../controllers/errorCodeController');

router.route('/')
    .post(ErrorCodeController.newErrorCode);

router.route('/:errorCodeId')
    .get(ErrorCodeController.getErrorCode)
    .patch(ErrorCodeController.updatedErrorCode)
    .delete(ErrorCodeController.deleteErrorCode);
    
module.exports = router;