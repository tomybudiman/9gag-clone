const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const loginSocmed = (req,res) => {
  User.findOne({
    email :  req.body.email
  }).then(check => {
    if(check){
      const token = jwt.sign({_id : check._id},process.env.TOKENSECRET);
      res.send({
        status : true,
        token : token,
        msg : 'User has been registered'
      });
    }else{
      new User(req.body).save().then(resp => {
        const token = jwt.sign({_id : resp._id},process.env.TOKENSECRET);
        res.send({
          status : true,
          token : token,
          msg : resp
        });
      });
    }
  }).catch(err => {
    res.send({
      status : true,
      msg : err
    });
  });
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
          req.headers.userId = decoded._id;
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
  loginSocmed,
  cekLogin
};
