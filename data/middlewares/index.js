const actionDB = require('../helpers/actionModel');
const projectDB = require('../helpers/projectModel');

const validateId = id => {
  if (parseInt(id)) {
    return true;
  } else {
    return false;
  }
};

const validateProjectId = async (req, res, next) => {
  const { id } = req.params;
  if (validateId(id)) {
    try {
      const project = await projectDB.get(id);
      console.log(project);
      next();
    } catch (error) {
      res.status(500).json({ error: 'There was an error validating the id' });
    }
  } else {
    res.status(400).json({ message: 'The id is invalid' });
  }
};

const validateActionId = async (req, res, next) => {
  const { id } = req.params;
  if (validateId(id)) {
    try {
      const action = await actionDB.get(id);
      console.log(action);
      next();
    } catch (error) {
      res.status(500).json({ error: 'There was an error validating the id' });
    }
  } else {
    res.status(400).json({ message: 'The id is invalid' });
  }
};
module.exports = {
  validateActionId,
  validateProjectId
};
