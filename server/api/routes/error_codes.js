const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Project = require('../models/projectModel');
const ErrorCode = require('../models/errorCodeModel');

router.get("/:projectId", (req, res, next) => {
    ErrorCode.find({project_id: req.params.projectId})
    .select()
    .populate('Project')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            error_codes: docs.map(doc => {
                return{
                    _id: doc._id,
                    project_id: doc.project_id,
                    code: doc.code,
                    location: doc.location,
                    message: doc.message,
                    description: doc.description,
                    last_updated_at: doc.last_updated_at,
                    created_at: doc.created_at
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

module.exports = router;