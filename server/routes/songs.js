const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const {
  getSongs,
  getSong,
  addSong,
  updateSong,
  deleteSong,
} = require('../controllers/songController');

router.use(verifyToken);

// Get songs
router.get('/', getSongs);

// Get song
router.get('/:id', getSong);

// Add song
router.post('/', addSong);

// Update song
router.patch('/:id', updateSong);

// Delete song
router.delete('/:id', deleteSong);

module.exports = router;
