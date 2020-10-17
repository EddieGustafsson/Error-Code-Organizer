const mongoose = require('mongoose');

const Project = require("../models/projectModel");

module.exports = {
    index: async(req, res, next) => {
        Project.find()
        .populate('error_codes')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                projects: docs.map(doc => {
                    return{
                        _id: doc._id,
                        title: doc.title,
                        description: doc.description,
                        error_codes: doc.error_codes.length,
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
    },
    newProject: async(req, res, next) => {
        const project = new Project({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            last_updated_at: new Date(),
            created_at: new Date()
        });
        project.save().then(result => {
            res.status(201).json({
                message: 'Project were created',
                createdProject: {
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
    },
    getProject: async(req, res, next) => {
        const id = req.params.projectId;
        Project.findById(id)
        .select('_id title description error_codes last_updated_at created_at')
        .populate('error_codes')
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
    },
    updatedProject: async(req, res, next) => {
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
    },
    deleteProject: async(req, res, next) => {
        const id = req.params.projectId;
        Project.deleteOne({_id: id})
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
    }
};