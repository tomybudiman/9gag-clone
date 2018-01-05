const router = require('express').Router();

const uploader = require('../helpers/upload');
const photoControl = require('../controllers/controlPhotos');

// Fetch All Photos
router.get('/all',photoControl.fetchPhotos);

// Upload New Photo
router.post('/add',uploader.multer.any(),uploader.uploadGoogleStorage,photoControl.add);

// Upvote
router.post('/upvote',photoControl.cekLogin,photoControl.upvote);

// Downvote
router.post('/downvote',photoControl.cekLogin,photoControl.downvote);

module.exports = router;
