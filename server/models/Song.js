const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    artist: { type: String },
    title: { type: String },
    songURL: { type: String },
    uploadedBy: { type: [Schema.Types.ObjectId], ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Song', songSchema);
