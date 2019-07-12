const router = require('express').Router();
const projectsDB = require('../helpers/projectModel');
const { validateProjectId, validateProject } = require('../middlewares/index');

router.get('/', async (req, res) => {
  try {
    const projects = await projectsDB.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Couldn't retreive the projects" });
  }
});

router.get('/:id', validateProjectId, async (req, res) => {
  try {
    const project = await projectsDB.get(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Couldn't retreive the project" });
  }
});

router.post('/', validateProject, async (req, res) => {
  try {
    const project = await projectsDB.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Couldn't add the project" });
  }
});

router.put('/:id', validateProject, validateProjectId, async (req, res) => {
  try {
    const project = await projectsDB.update(req.params.id, req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Couldn't update the project" });
  }
});

router.delete('/:id', validateProjectId, async (req, res) => {
  try {
    const project = await projectsDB.remove(req.params.id);
    if (project) {
      res.status(200).json({ message: 'Project deleted successfully' });
    } else {
      res.status(500).json({ error: 'Project not deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete the project" });
  }
});

router.get('/:id/actions', validateProjectId, async (req, res) => {
  try {
    const project = await projectsDB.getProjectActions(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Couldn't retreive the project" });
  }
});

module.exports = router;
