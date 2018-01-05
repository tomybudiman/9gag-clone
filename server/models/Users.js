const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email : String,
  username : String,
  name : String,
  password : String
});

const Users = mongoose.model('Users',userSchema);

module.exports = Users;
