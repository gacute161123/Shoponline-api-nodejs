const express = require('express');
var router = express.Router();
const multer = require('multer');
var uploadController = require('../controllers/uploadController');

router.post('/', uploadController.upload.single('file'), (req, res, next) => {
  res.json(req.file)
});

module.exports = router