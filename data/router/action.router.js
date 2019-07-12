const router = require('express').Router();
const actionsDB = require('../helpers/actionModel');
const {
  validateProjectId,
  validateAction,
  validateActionId
} = require('../middlewares/index');

router.get('/', async (req, res) => {
  res.status(200).json('working');
});
module.exports = router;
