const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  UserId : {
    type : Schema.Types.ObjectId,
    ref : 'Users'
  },
  url : String,
  height : Number,
  title : String,
  upvotes : [{
    type : Schema.Types.ObjectId,
    ref : 'Users'
  }],
  downvotes : [{
    type : Schema.Types.ObjectId,
    ref : 'Users'
  }],
  dateCreated : {
    type : Date,
    default : new Date()
  }
});

const Photos = mongoose.model('Photos',photoSchema);

module.exports = Photos;
