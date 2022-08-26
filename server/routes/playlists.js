const express = require('express');
const router = express.Router();
const {
  getPlaylists,
  getPlaylist,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require('../controllers/playlistController');

// Get all playlists
router.get('/', getPlaylists);

// Get single playlist
router.get('/:id', getPlaylist);

// Add playlist
router.post('/', addPlaylist);

// Update playlist
router.post('/:id', updatePlaylist);

// Delete playlist
router.delete('/:id', deletePlaylist);

module.exports = router;
