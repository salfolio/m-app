const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');

const router = express.Router();

// define the storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// create multer instance
const upload = multer({ storage: storage });

// handle file upload
router.post('/upload', upload.array('files'), (req, res) => {
  const { files } = req;

  // execute python script on each file
  files.forEach((file) => {
    const pythonProcess = spawn('python', ['scripts/testscript.py', file.path]);
    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });

  res.status(200).send({ message: 'Files uploaded successfully.' });
});

module.exports = router;
