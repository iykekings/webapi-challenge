const router = require('express').Router();
const projectsDB = require('../helpers/projectModel');
const { validateProjectId } = require('../middlewares/index');

router.get('/', async (req, res) => {
  try {
    const projects = await projectsDB.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Couldn't retreive the projects" });
  }
});

router.get('/:id', validateProjectId, async (req, res) => {
  const { id } = req.params;
  try {
    const project = await projectsDB.get(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Couldn't retreive the project" });
  }
});

module.exports = router;
