const router = require('express').Router()
      commentControl = require('../controllers/controlComments')


// get comments based on photo id
router.get('/:photoId', commentControl.getAll)

// post comment to a photo based on photo id
router.post('/:photoId', commentControl.postComment)

// edit comment based on comment ID
router.put('/:commentId', commentControl.editComment)

// delete comment based on comment ID
router.delete('/:commentId', commentControl.deleteComment)

module.exports = router
