const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const heroesController = require('../controllers/heroes');

// All paths start with '/api/heroes'

// Protect all defined routes
router.use(ensureLoggedIn);

// GET /api/heroes (INDEX action)
router.get('/', heroesController.index); 
// GET /api/heroes/avaialble/:teamId
router.get('/available/:teamId', heroesController.avaiableForTeam); 

module.exports = router