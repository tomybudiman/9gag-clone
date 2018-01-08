const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  UserId : {
    type : Schema.Types.ObjectId,
    ref : 'Users'
  },
  PhotoId : {
    type : Schema.Types.ObjectId,
    ref : 'Photo'
  },
  comment : String,
  dateCreated : {
    type : Date,
    default : new Date()
  }
});

const Comments = mongoose.model('Comments',commentSchema);

module.exports = Comments;
