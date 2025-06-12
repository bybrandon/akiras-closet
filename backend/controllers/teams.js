const Team = require('../models/team');

const express = require('express');
const router = express.Router();

// All paths start with '/api/teams'

// GET /api/teams (INDEX action)
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find({});
    res.status(200).json(teams);
  } catch (err) {
    // It's very unlikely to have an error occur 
    // in the INDEX action
    res.status(500).json({ err: err.message })
  }
});

// GET /api/teams/:teamId (SHOW action)
router.get('/:teamId', async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) {
      res.status(404);
      throw new Error('Squad Not Availible');
    }
    res.status(200).json(pet);
  } catch (err) {
    if (res.statusCode !== 404) res.status(500);
    res.json({ err: err.message });
  }
});

// POST /api/teams (CREATE action)
router.post('/', async (req, res) => {
  try {
    const createdTeam = await Team.create(req.body);
    res.status(201).json(createdTeam);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// DELETE /api/teams/:teamId (DELETE action)
router.delete('/:teamId', async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.teamId);
    // The below implements authorization and ensures that the user that created the pet
    // is the one trying to delete it.
    // const deletedPet = await Pet.findOneAndDelete({user: req.user._id, _id: req.params.petId});
    if (!deletedTeam) {
      res.status(404);
      throw new Error('Squad Not Found');
    }
    res.status(200).json(deletedPet);
  } catch (err) {
    if (res.statusCode !== 404) res.status(500);
    res.json({ err: err.message });
  }
});

// PUT /api/teams/:teamId (UPDATE action)
router.put('/:teamId', async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.teamId,
      req.body,
      { new: true }
    );
    if (!updatedTeam) {
      res.status(404);
      throw new Error('Squad Not Found');
    }
    res.json(updatedTeam);
  } catch (err) {
    if (res.statusCode !== 404) res.status(500);
    res.json({ err: err.message });
  }
});

module.exports = router;