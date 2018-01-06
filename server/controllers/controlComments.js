const Comment = require('../models/Comment');

const getAll = (req, res) => {
  Comment.find({photoId : req.body.photoId})
    .then(success => res.status(200).send(success))
    .catch(error => res.status(500).send(error))
}

const postComment = (req, res) => {
  let comment = new Comment({
    UserId: req.body.UserId,
    PhotoId: req.body.PhotoId,
    comment: req.body.commment
  })
    .then(success => res.status(200).send(success))
    .catch(error => res.status(500).send(error))
}

const editComment = (req, res) => {
  
}

const deleteComment = (req, res) => {
  
}

module.exports = {
  getAll,
  postComment,
  editComment,
  deleteComment
}
