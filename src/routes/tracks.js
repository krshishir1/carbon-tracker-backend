const express = require('express');
const router = express.Router();

const createTrackController = require('../controllers/tracks/createTrack');
const getTracksByDateController = require('../controllers/tracks/getTracksByDate');
const getHistoryController = require('../controllers/tracks/getHistory');

const checkUser = require('../checkUser');

router.post("/create", checkUser, createTrackController)
router.get("/answers", checkUser, getTracksByDateController)
router.get("/history", checkUser, getHistoryController)

module.exports = router;