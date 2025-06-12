const Hero = require('../models/hero');

module.exports = {
  index
};

async function index(req, res) {
  try {
    const heroes = await Hero.find({});
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(heroes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to find hero' });
  }
}

