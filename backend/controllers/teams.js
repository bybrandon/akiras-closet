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
      throw new Error('Team Not Availible');
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
    // Most likely a validation error has occurred.
    // 400 is a Bad Request
    res.status(400).json({ err: err.message });
  }
});

// DELETE /api/pets/:petId (DELETE action)
router.delete('/:petId', async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.petId);
    // The below implements authorization and ensures that the user that created the pet
    // is the one trying to delete it.
    // const deletedPet = await Pet.findOneAndDelete({user: req.user._id, _id: req.params.petId});
    if (!deletedPet) {
      res.status(404);
      throw new Error('Pet Not Found');
    }
    res.status(200).json(deletedPet);
  } catch (err) {
    if (res.statusCode !== 404) res.status(500);
    res.json({ err: err.message });
  }
});

// PUT /api/pets/:petId (UPDATE action)
router.put('/:petId', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.petId,
      // Update object
      req.body,
      // Options object
      // Need to specify new: true if you want the updated doc to be returned
      { new: true }
    );
    if (!updatedPet) {
      res.status(404);
      throw new Error('Pet Not Found');
    }
    res.json(updatedPet);
  } catch (err) {
    if (res.statusCode !== 404) res.status(500);
    res.json({ err: err.message });
  }
});

module.exports = router;