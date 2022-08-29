const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    artist: { type: String, default: '' },
    title: { type: String, default: '' },
    songURL: { type: String, default: '' },
    inPlaylist: { type: Schema.Types.ObjectId, ref: 'Playlist' },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Song', songSchema);
