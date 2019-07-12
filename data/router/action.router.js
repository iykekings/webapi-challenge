const router = require('express').Router();
const actionsDB = require('../helpers/actionModel');
const { validateAction, validateActionId } = require('../middlewares/index');

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
      .json({ error: "Couldn't retrieve actions for that action Id" });
  }
});

router.post('/', validateAction, async (req, res) => {
  try {
    const action = await actionsDB.insert(req.body);
    res.status(201).json(action);
  } catch (error) {
    res.status(500).json({ error: "Couldn't add the action" });
  }
});

router.put('/:id', validateAction, validateActionId, async (req, res) => {
  try {
    const action = await actionsDB.update(req.params.id, req.body);
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({ error: "Couldn't update the action" });
  }
});

router.delete('/:id', validateActionId, async (req, res) => {
  try {
    const action = await actionsDB.remove(req.params.id);
    if (action) {
      res.status(200).json({ message: 'action deleted successfully' });
    } else {
      res.status(500).json({ error: 'action not deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: "Couldn't delete the action" });
  }
});
module.exports = router;
