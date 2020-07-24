const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Project = require('../models/projectModel');
const ErrorCode = require('../models/errorCodeModel');

router.get("/:errorcodeId", (req, res, next) => {
    ErrorCode.find({_id: req.params.errorcodeId})
    .select()
    .populate('Project')
    .exec()
    .then(docs => {
        const response = {
            errorcode: docs.map(doc => {
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

router.post('/', (req, res, next) => {
    Project.findById(req.body.wikiId)
        .then(errorcode => {
            if(!Project){
                return res.status(404).json({
                    message: "Project not found"
                });
            }
            const error_code = new ErrorCode({
                _id: mongoose.Types.ObjectId(),
                project_id: req.body.project_id,
                code: req.body.code,
                location: req.body.location,
                message: req.body.message,
                description: req.body.description,
                last_updated_at: req.body.last_updated_at,
                created_at: req.body.created_at
            });
            return error_code.save()
        })
        .then(result => {
            res.status(201).json({
                message: 'Error code created'
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error            
            })
        });
});

module.exports = router;