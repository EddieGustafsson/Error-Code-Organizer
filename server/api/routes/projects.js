const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const checkAuth = require('../auth/check-auth');

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

router.patch("/:serviceId", checkAuth, (req, res, next) => {
    const id = req.params.serviceId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Service.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Service updated',
            request: {
                type: 'GET',
                url: 'http://'+ process.env.HOST + ":" + process.env.PORT +'/services/' + id
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

router.delete('/:serviceId', checkAuth, (req, res, next) => {
    const id = req.params.serviceId;
    Service.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Service delted',
            request: {
                type: 'POST',
                url: 'http://'+ process.env.HOST + ":" + process.env.PORT +'/services',
                body: {name: 'String', userId: 'Number', type: 'String'}
            }
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