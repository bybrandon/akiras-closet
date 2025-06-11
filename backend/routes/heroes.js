const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/heroes'

// Protect all defined routes
router.use(ensureLoggedIn);

// GET /api/heroes (INDEX action)
router.get('/', async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch heroes' });
  }
});


// router.get('/', postsCtrl.index);
// POST /api/posts (CREATE action)
// router.post('/', postsCtrl.create);

module.exports = router