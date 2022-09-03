const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp3') {
      cb(new Error('File type must be .mp3'), false);
      return;
    }
    cb(null, true);
  },
});
