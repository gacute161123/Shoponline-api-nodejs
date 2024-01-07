const express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'app/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
    // dest: 'app/public/uploads/',
    storage
})
router.post('/', upload.single('file'), (req, res, next) => {
  res.json(req.file)
});

module.exports = router