const mongoose = require('mongoose');

const Project = require('../models/projectModel');
const ErrorCode = require('../models/errorCodeModel');

module.exports = {
    index: async(req, res, next) => {
        ErrorCode.find({project_id: req.params.projectId})
        .select()
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
    },
    newErrorCode: async(req, res, next) => {
        Project.findById(req.body.wikiId)
        .then(errorcode => {
            if(!Project){
                return res.status(404).json({
                    message: "Project not found"
                });
            }

            const error_code_id = mongoose.Types.ObjectId();

            const error_code = new ErrorCode({
                _id: error_code_id,
                project_id: req.body.project_id,
                code: req.body.code,
                location: req.body.location,
                message: req.body.message,
                description: req.body.description,
                last_updated_at: req.body.last_updated_at,
                created_at: req.body.created_at
            });

            // Adds the error code id to the project document.
            Project.updateMany({_id: req.body.project_id}, {$push: {error_codes: error_code_id}})
            .exec()
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error
                });
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
    },
    getErrorCode: async(req, res, next) => {
        ErrorCode.find({_id: req.params.errorCodeId})
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
    },
    updatedErrorCode: async(req, res, next) => {
        const id = req.params.errorCodeId;

        ErrorCode.updateMany({_id: id}, {last_updated_at: new Date()}, {$set: req.body})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Error code updated'
            });
    
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
    },
    deleteErrorCode: async(req, res, next) => {
        const id = req.params.errorCodeId;
    
        ErrorCode.deleteOne({_id: id})
        .exec()
        .then(result => {

            // Removes the error code id from the project document.
            Project.updateMany({_id: req.body.project_id}, {$pull: {error_codes: error_code_id}})
            .exec()
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: error
                });
            });

            res.status(200).json({
                message: 'Error code delted'
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