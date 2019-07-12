const router = require('express').Router();
const actionsDB = require('../helpers/actionModel');
const {
  validateProjectId,
  validateAction,
  validateActionId
} = require('../middlewares/index');

router.get('/', async (req, res) => {
  try {
    const actions = await actionsDB.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: "Couldn't retrieve actions" });
  }
});

router.get('/:id', validateActionId, async (req, res) => {
  try {
    const actions = await actionsDB.get(req.params.id);
    res.status(200).json(actions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Couldn't retrieve actions for that project Id" });
  }
});
module.exports = router;
