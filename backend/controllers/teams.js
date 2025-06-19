const Team = require('../models/team');

const express = require('express');
const router = express.Router();

// All paths start with '/api/teams'

module.exports = {
  index,
  show,
  create,
  removeHero,
  addHero,
  addComment,
  deleteTeam,
  update
}

// GET /api/teams (INDEX action)
async function index(req, res) {
  try {
    const teams = await Team.find({}).populate('author');
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

// GET /api/teams/:teamId (SHOW action)
async function show(req, res) {
  try {
    const team = await Team.findById(req.params.teamId).populate('heroes');
    if (!team) {
      res.status(404);
      throw new Error('Squad Not Availible');
    }
    res.status(200).json(team);
  } catch (err) {
    if (res.statusCode !== 404) res.status(500);
    res.json({ err: err.message });
  }
}

// POST /api/teams (CREATE action)
async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const createdTeam = await Team.create(req.body);
    res.status(201).json(createdTeam);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

// DELETE /api/teams/:teamId (DELETE a team)
async function deleteTeam(req, res) {
  try {
    const team = await Team.findOneAndDelete({ _id: req.params.teamId, author: req.user._id });
    res.json(team);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

// DELETE /api/teams/heroes/:heroId (remove hero from team)
async function removeHero(req, res) {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) {
      res.status(404);
      throw new Error('Squad Not Found');
    }
    team.heroes = team.heroes.filter((h) => !h.equals(req.params.heroId));
    await team.save();
    await team.populate('heroes');
    res.status(200).json(team);
  } catch (err) {
    if (res.statusCode !== 404) res.status(500);
    res.json({ err: err.message });
  }
}

// POST /api/teams/heroes/:heroId (add hero to team)
async function addHero(req, res) {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) {
      res.status(404);
      throw new Error('Squad Not Found');
    }
    team.heroes.push(req.params.heroId);
    await team.save();
    await team.populate('heroes');
    res.status(200).json(team);
  } catch (err) {
    if (res.statusCode !== 404) res.status(500);
    res.json({ err: err.message });
  }
}

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
}

// POST /api/teams/:teamId/comments
async function addComment(req, res) {
  console.log(req.user._id, req.body.author);
  try {
    req.body.author = req.user._id;
    const team = await Team.findByIdAndUpdate(
      req.params.teamId,
      { $push: { comments: req.body } }
    );
    res.json(team);
  } catch (err) {
    if (res.statusCode !== 404) res.status(500);
    res.json({ err: err.message });
  }
}