const router = require('express').Router();
const projectsDB = require('../helpers/projectModel');

router.get('/', async (req, res) => {
  try {
    const projects = await projectsDB.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Couldn't retreive the projects" });
  }
});

module.exports = router;
