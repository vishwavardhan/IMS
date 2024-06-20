// server/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new project
router.post('/add', async (req, res) => {
  const { name } = req.body;

  const project = new Project({ name });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get inventory for a specific project
router.get('/:id/inventory', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('inventory');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project.inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
