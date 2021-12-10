const mongoose = require('mongoose');

const Project = require("../models/projectModel");
const User = require("../models/userModel");
const Audit = require('../models/auditEventModel');
const AuditEventController = require('../controllers/auditEventController');

module.exports = {
    index: async(req, res, next) => {
        const user_id = req.user.id;
        Project.find({ creator_user_id: user_id })
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
            creator_user_id: req.user.id,
            last_updated_at: new Date(),
            created_at: new Date()
        });

        project.save().then(result => {

            // Adds the project id to the user document.
            User.updateMany({_id: req.user.id}, {$push: {projects: result._id}})
            .exec()
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            });

            AuditEventController.newAuditEvent({
                "action": "create",
                "action_target": "project",
                "action_target_id": result._id,
                "action_value": null,
                "actor_id": req.user.id,
                "actor_host": "ProjectController",
                "event_timestamp": new Date()
            });

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

        Project.updateMany({_id: id}, {$set: req.body, last_updated_at: new Date()})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Project updated'
            });
            
            AuditEventController.newAuditEvent({
                "action": "update",
                "action_target": "project",
                "action_target_id": id,
                "action_value": req.body,
                "actor_id": req.user.id,
                "actor_host": "ProjectController",
                "event_timestamp": new Date()
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
                message: 'Project deleted'
            });
            
            AuditEventController.newAuditEvent({
                "action": "deletion",
                "action_target_id": id,
                "action_target": "project",
                "action_id": id,
                "action_value": null,
                "actor_id": req.user.id,
                "actor_host": "ProjectController",
                "event_timestamp": new Date()
            });

        })
        .catch(error => {
            console.log(error);
            res.status.apply(500).json({
                error: error
            })
        });
    },
    getProjectEvents: async(req, res, next) => {
        const id = req.params.projectId;
        Audit.find({action_target_id: id})
        .select('_id action event_timestamp action_target')
        .populate('actor_id', '_id name username')
        .exec()
        .then(doc => {            
            if(doc){
                res.status(200).json({
                    events: doc
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
    }
};