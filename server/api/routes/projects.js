const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkAuth = require('../controllers/auth');

const Project = require("../models/projectModel");

router.get('/', (req, res, next) => {
    Project.find()
    .select('_id title date description type')
    .populate('projects')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            projects: docs.map(doc => {
                return{
                    _id: doc._id,
                    title: doc.title,
                    description: doc.description,
                    date: doc.date,
                    type: doc.type,
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
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        type: req.body.type
    });
    project.save().then(result => {
        res.status(201).json({
            message: 'Project were created',
            createdService: {
                title: result.title,
                _id: result._id
            }
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

router.get('/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    Project.findById(id)
    .select('_id title date description type')
    .populate('project')
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json({
                project: doc
            });
        } else {
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

router.patch("/:projectId", (req, res, next) => {
    const id = req.params.projectId;

    Project.updateMany({_id: id}, {last_updated_at: new Date()}, {$set: req.body})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Project updated'
        });

    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

router.delete('/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    Project.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Project delted'
        });
    })
    .catch(error => {
        console.log(error);
        res.status.apply(500).json({
            error: error
        })
    });
})

module.exports = router;