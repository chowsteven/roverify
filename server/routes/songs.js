const express = require('express');
const router = express.Router();
const {
  getSongs,
  getSong,
  addSong,
  updateSong,
  deleteSong,
} = require('../controllers/songController');

// Get songs
router.get('/', getSongs);

// Get song
router.get('/:id', getSong);

// Add song
router.post('/', addSong);

// Update song
router.post('/:id', updateSong);

// Delete song
router.delete('/:id', deleteSong);

module.exports = router;
