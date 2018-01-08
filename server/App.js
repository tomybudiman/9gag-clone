const app = require('express')();
const mongoose = require('mongoose');
const env = require('dotenv').config();
const parser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017/9gagclone',{
  useMongoClient : true
});
app.use(parser.urlencoded({extended: false}));
app.use(parser.json())

app.get('/',(req,res) => {
  res.send('Server ready!');
});

const images = require('./routes/images');
app.use('/api/images',images);

const comments = require('./routes/comments');
app.use('/api/comments',comments)

const users = require('./routes/users');
app.use('/api/users',users);

const listener = app.listen(process.env.PORT || '3000',() => {
  console.log('Server started at port',listener.address().port);
});
