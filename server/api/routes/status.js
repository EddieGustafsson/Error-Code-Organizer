const express = require('express');
const router = express.Router();

router.route('/')
  .get(
    async(req, res, next) => {
        res.status(200).json({
            message: 'All services operational'
        });
    }
  );

module.exports = router;