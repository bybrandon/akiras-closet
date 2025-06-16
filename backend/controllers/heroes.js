const Hero = require('../models/hero');
const Team = require('../models/team');

module.exports = {
  index,
  avaiableForTeam,
};

async function index(req, res) {
  try {
    const heroes = await Hero.find({});
    res.json(heroes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to find hero' });
  }
}

async function avaiableForTeam(req, res) {
  try {
    const team = await Team.findById(req.params.teamId);
    const heroes = await Hero.find({_id: {$nin: team.heroes}});
    res.json(heroes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to find hero' });
  }
}
