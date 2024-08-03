const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = __dirname + "/resources/static/assets/uploads/";
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const uploadFile = multer({ storage: storage });

router.post("/upload", uploadFile.array('file', 4), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(203).send('file upload failed');
    }
    const filesPaths = req.files.map(file => file.filename);
    return res.status(200).send(filesPaths);
});

module.exports = router;
