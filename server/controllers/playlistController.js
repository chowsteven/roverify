const Playlist = require('../models/Playlist');
const mongoose = require('mongoose');
const { body } = require('express-validator');

// Get playlists
exports.getPlaylists = async (req, res, next) => {
  // query playlists by userId and sort alphabetically
  const userId = req.userId;
  const playlists = await Playlist.find({ createdBy: userId }).sort({
    name: 1,
  });

  res.json({ playlists });
};

// Get playlist
exports.getPlaylist = (req, res, next) => {
  // get id from URL
  const { id } = req.params;

  // if invalid ObjectId, return error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: 'Playlist not found' });
  }

  // find playlist by id
  Playlist.findOne({ _id: id })
    .populate({ path: 'songs', options: { sort: { createdAt: -1 } } })
    .exec((err, playlist) => {
      if (err) {
        return res.json({ error: err.message });
      }

      res.json({ playlist });
    });
};

// Add playlist
exports.addPlaylist = [
  // sanitize playlist name
  body('name').trim().escape(),
  (req, res, next) => {
    // get playlist name and userId
    const { name } = req.body;
    const userId = req.userId;

    // create playlist
    Playlist.create({ name, createdBy: userId }, (err, playlist) => {
      if (err) {
        return res.json({ error: err.message });
      }

      res.json({ newPlaylist: playlist });
    });
  },
];

// Update playlist
exports.updatePlaylist = [
  // sanitize playlist name
  body('name').trim().escape(),
  (req, res, next) => {
    // get id from URL
    const { id } = req.params;

    // if invalid ObjectId, return error
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ error: 'Playlist not found' });
    }

    // query by id, patch with req.body values, return new playlist object
    Playlist.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
      (err, playlist) => {
        if (err) {
          return res.json({ error: err.message });
        }

        res.json({ playlist });
      }
    );
  },
];

// Delete playlist
exports.deletePlaylist = (req, res, next) => {
  // get id from URL
  const { id } = req.params;

  // if invalid ObjectId, return error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: 'Playlist not found' });
  }

  // query by id and delete
  Playlist.findOneAndDelete({ _id: id }, (err, playlist) => {
    if (err) {
      return res.json({ error: err.message });
    }

    res.json({ playlist });
  });
};
