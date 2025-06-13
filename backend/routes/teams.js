const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

const teamsController = require('../controllers/teams');

router.use(ensureLoggedIn);

router.get('/', teamsController.index);         
router.post('/', teamsController.create);       
router.get('/:id', teamsController.show);        
router.put('/:id', teamsController.update);      
router.delete('/:id', teamsController.deleteTeam);   

module.exports = router;
