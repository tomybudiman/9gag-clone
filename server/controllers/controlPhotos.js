const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const Photo = require('../models/Photo');

const add = (req,res) => {
  if(!req.uploadstatus.status){
    res.send({
      status : req.uploadstatus.status,
      msg : 'Error Upload Storage!'
    });
  }else{
    const photo = new Photo({
      url : req.fileurl,
      height : req.body.height,
      title : req.body.title
    });
    photo.save().then(resp => {
      res.send({
        status : req.uploadstatus.status,
        msg : resp
      });
    }).catch(err => {
      res.send({
        status : req.uploadstatus.status,
        msg : err
      });
    });
  }
}

const fetchPhotos = (req,res) => {
  Photo.find().sort({
    _id : -1
  }).then(resp => {
    res.send({
      status : true,
      msg : resp
    });
  }).catch(err => {
    res.send({
      status : false,
      msg : err
    });
  });
}

const vote = (req,res) => {
  Photo.findOne({
    _id : ObjectId(req.body.postId)
  }).then(post => {
    if(post){ // Jika post
      switch(req.headers.type){
        case 'upvote':
          post.downvotes.splice(post.downvotes.indexOf(req.headers.userId),1);
          if(post.upvotes.indexOf(req.headers.userId) == -1){
            post.upvotes.push(req.headers.userId);
          }
          Photo.updateOne({
            _id : ObjectId(req.body.postId)
          },{
            upvotes : post.upvotes,
            downvotes : post.downvotes
          }).then(resp => {
            res.send({
              login : true,
              status : true,
              userId : req.headers.userId,
              msg : resp
            });
          });
          break;
        case 'downvote':
          post.upvotes.splice(post.upvotes.indexOf(req.headers.userId),1);
          if(post.downvotes.indexOf(req.headers.userId) == -1){
            post.downvotes.push(req.headers.userId)
          }
          Photo.updateOne({
            _id : ObjectId(req.body.postId)
          },{
            upvotes : post.upvotes,
            downvotes : post.downvotes
          }).then(resp => {
            res.send({
              login : true,
              status : true,
              userId : req.headers.userId,
              msg : resp
            });
          });
          break;
      }
    }else{ // Jika post tidak ditemukan
      res.send({
        login : true,
        status : false,
        msg : 'Post not found!'
      });
    }
  }).catch(err => {
    res.send({
      status : false,
      msg : err
    });
  });
}

const remove = (req,res) => {
}

module.exports = {
  add,
  fetchPhotos,
  vote,
  remove
};
