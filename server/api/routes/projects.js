const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController');

router.route('/')
    .get(ProjectController.index)
    .post(ProjectController.newProject);

router.route('/:projectId')
    .get(ProjectController.getProject)
    .patch(ProjectController.updatedProject)
    .delete(ProjectController.deleteProject);

module.exports = router;