const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

const teamsController = require('../controllers/teams');

router.use(ensureLoggedIn);

// all paths start with /api/teams

router.get('/', teamsController.index);         
router.post('/', teamsController.create);       
router.get('/:teamId', teamsController.show);        
router.put('/:teamId', teamsController.update);      
router.delete('/heroes/:heroId', teamsController.removeHero);   

module.exports = router;
