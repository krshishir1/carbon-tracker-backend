const express = require('express');
const router = express.Router();

const createTrackController = require('../controllers/tracks/createTrack');
const getTracksByDateController = require('../controllers/tracks/getTracksByDate');

const checkUser = require('../checkUser');

router.post("/create", checkUser, createTrackController)
router.get("/answers", checkUser, getTracksByDateController)

module.exports = router;