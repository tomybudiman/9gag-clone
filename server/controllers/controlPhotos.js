const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const Photo = require('../models/Photo');
const User = require('../models/Users');

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

const upvote = (req,res) => {
  Photo.findOne({
    _id : ObjectId(req.body.postId)
  }).then(post => {
    if(post){
    }else{
      res.send({
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

const downvote = (req,res) => {
  res.send('downvote');
}

const cekLogin = (req,res,next) => {
  if(req.headers.token == '' || req.headers.token == null){
    res.send({
      status : true,
      login : false,
      msg : 'Please login first!'
    });
  }else{
    jwt.verify(req.headers.token,process.env.TOKENSECRET,(err,decoded) => {
      User.findOne({
        _id : ObjectId(decoded._id)
      }).then(check => {
        if(check){
          next();
        }else{
          res.send({
            status : true,
            login : false,
            msg : 'Please login first!'
          });
        }
      }).catch(err => {
        res.send({
          status : false,
          msg : err
        });
      });
    });
  }
}

module.exports = {
  add,
  fetchPhotos,
  upvote,
  downvote,
  cekLogin
};
