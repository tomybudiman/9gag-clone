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

module.exports = {
  loginSocmed
};
