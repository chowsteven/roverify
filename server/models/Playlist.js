const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    name: { type: String, required: true },
    songs: { type: [Schema.Types.ObjectId], ref: 'Song', default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Playlist', playlistSchema);
