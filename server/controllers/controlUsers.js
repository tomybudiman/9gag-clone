const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/Users');

const loginSocmed = (req,res) => {
  User.findOne({
    email :  req.body.email
  }).then(check => {
    if(check){
      res.send({
        status : true,
        msg : 'User has been registered'
      });
    }else{
      new User(req.body).save().then(resp => {
        res.send({
          status : true,
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
