const Team = require('../models/team');

const express = require('express');
const router = express.Router();

// All paths start with '/api/teams'

module.exports = {
  index,
  show,
  create,
  deleteTeam,
  update
};

// GET /api/teams (INDEX action)
async function index(req, res) {
  try {
    const teams = await Team.find({});
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
};

// GET /api/teams/:teamId (SHOW action)
async function show(req, res) {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) {
      res.status(404);
      throw new Error('Squad Not Availible');
    }
    res.status(200).json(team);
  } catch (err) {
    if (res.statusCode !== 404) res.status(500);
    res.json({ err: err.message });
  }
};

// POST /api/teams (CREATE action)
async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const createdTeam = await Team.create(req.body);
    res.status(201).json(createdTeam);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// DELETE /api/teams/:teamId (DELETE action)
 async function deleteTeam(req, res) {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.teamId);
    if (!deletedTeam) {
      res.status(404);
      throw new Error('Squad Not Found');
    }
    res.status(200).json(deletedTeam);
  } catch (err) {
    if (res.statusCode !== 404) res.status(500);
    res.json({ err: err.message });
  }
};

// PUT /api/teams/:teamId (UPDATE action)
 async function update(req, res) {
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
};
