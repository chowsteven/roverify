const Song = require('../models/Song');
const Playlist = require('../models/Playlist');
const mongoose = require('mongoose');
const { body } = require('express-validator');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

// Get songs
exports.getSongs = async (req, res, next) => {
  // query songs by userId and sort by newest
  const userId = req.userId;
  const songs = await Song.find({ uploadedBy: userId }).sort({ createdAt: 1 });

  res.json({ songs });
};

// Get song
exports.getSong = (req, res, next) => {
  // get id from URL
  const { id } = req.params;

  // if invalid ObjectId, return error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: 'Invalid song ID' });
  }

  // find song by id
  Song.findOne({ _id: id }, (err, song) => {
    if (err) {
      return res.json({ error: err.message });
    }

    res.json({ song });
  });
};

// Add song
exports.addSong = [
  // sanitize inputs
  body('artist').trim().escape(),
  body('title').trim().escape(),
  body('songURL').trim().escape(),
  body('playlistName').trim().escape(),
  // upload using multer
  upload.single('song'),
  async (req, res, next) => {
    // get info from req.body
    const { artist, title, playlistName } = req.body;

    // get userId
    const userId = req.userId;

    // find playlist from playlist name
    const targetPlaylist = await Playlist.findOne({
      name: playlistName,
      createdBy: userId,
    });

    if (!targetPlaylist) {
      return res.json({ error: 'Playlist not found' });
    }

    // upload song to Cloudinary
    const uploadedSong = await cloudinary.uploader
      .upload(req.file.path, {
        resource_type: 'video',
        image_metadata: true,
        folder: userId,
      })
      .catch((err) => res.json({ error: err.message }));

    // create song
    Song.create(
      {
        artist,
        title,
        songURL: uploadedSong.secure_url,
        duration: uploadedSong.duration,
        cloudinaryId: uploadedSong.public_id,
        inPlaylist: targetPlaylist._id,
        uploadedBy: userId,
      },
      (err, song) => {
        if (err) {
          return res.json({ error: err.message });
        }

        // after creating song, add new song to target playlist songs array
        Playlist.findOneAndUpdate(
          { name: playlistName, createdBy: userId },
          { $push: { songs: song._id } },
          (err, result) => {
            if (err) {
              return res.json({ error: err.message });
            }
          }
        );

        res.json({ newSong: song });
      }
    );

    // delete from multer storage?
  },
];

// Update song
exports.updateSong = [
  // sanitized song inputs
  body('artist').trim().escape(),
  body('title').trim().escape(),
  body('songURL').trim().escape(),
  body('playlistName').escape(),
  async (req, res, next) => {
    // get id from URL
    const { id } = req.body;

    // if invalid ObjectId, return error
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ error: 'Song not found' });
    }

    // get playlistName from req.body
    // const { playlistName } = req.body;

    // get userId
    // const userId = req.userId;

    // // find song and store playlist ID
    // const oldSong = await Song.findOne({ _id: id, uploadedBy: userId });
    // const oldSongPlaylistId = oldSong.inPlaylist;

    // // find new playlist id using playlistName input and store playlist ID
    // const newPlaylist = await Playlist.findOne({
    //   name: playlistName,
    //   createdBy: userId,
    // });
    // const newPlaylistId = newPlaylist._id;

    // // if user updated the playlist, remove song from old playlist and add it to the new one
    // if (oldSongPlaylistId !== newPlaylistId) {
    //   Playlist.findOneAndUpdate(
    //     { _id: oldSongPlaylistId },
    //     { $pull: { songs: id } },
    //     (err, playlist) => {
    //       if (err) {
    //         return res.json({ error: err.message });
    //       }
    //     }
    //   );
    //   Playlist.findOneAndUpdate(
    //     { _id: newPlaylistId },
    //     { $push: { songs: id } },
    //     (err, playlist) => {
    //       if (err) {
    //         return res.json({ error: err.message });
    //       }
    //     }
    //   );
    // }

    // update song itself
    // ensure that inPlaylist takes an ObjectId and uploadedBy stays the same
    Song.findOneAndUpdate(
      { _id: id },
      { title: req.body.title, artist: req.body.artist },
      { new: true },
      (err, song) => {
        if (err) {
          return res.json({ error: err.message });
        }

        res.json({ song });
      }
    );
  },
];

// Delete song
exports.deleteSong = async (req, res, next) => {
  // get id from URL
  const { id } = req.params;

  // get userId from req object
  const userId = req.userId;

  // if invalid ObjectId, return error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: 'Song not found' });
  }

  // remove song from its playlist
  const song = await Song.findOne({ _id: id, uploadedBy: userId });
  const songPlaylistId = song.inPlaylist;
  Playlist.findOneAndUpdate(
    { _id: songPlaylistId },
    { $pull: { songs: id } },
    (err, playlist) => {
      if (err) {
        return res.json({ error: err.message });
      }
    }
  );

  // delete song from Cloudinary
  await cloudinary.uploader.destroy(song.cloudinaryId, {
    resource_type: 'video',
  });

  // delete song itself
  Song.findByIdAndDelete({ _id: id }, (err, result) => {
    if (err) {
      return res.json({ error: err.message });
    }

    res.json({ song: result });
  });
};
