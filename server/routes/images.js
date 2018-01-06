const router = require('express').Router();

const uploader = require('../helpers/upload');
const photoControl = require('../controllers/controlPhotos');
const userControl = require('../controllers/controlUsers');

// Fetch All Photos
router.get('/all',photoControl.fetchPhotos);

// Upload New Photo
router.post('/add',uploader.multer.any(),uploader.uploadGoogleStorage,photoControl.add);

// Upvote
router.post('/upvote',userControl.cekLogin,photoControl.vote);

// Downvote
router.post('/downvote',userControl.cekLogin,photoControl.vote);

// Delete
router.delete('/delete',photoControl.remove);

module.exports = router;
