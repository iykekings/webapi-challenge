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
      if (!project) {
        res.status(400).json({ message: 'The id does not exist' });
      } else {
        next();
      }
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
      if (!action) {
        res.status(400).json({ message: 'The id does not exist' });
      } else {
        next();
      }
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
