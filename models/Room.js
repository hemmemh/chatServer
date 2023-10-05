const mongoose = require('mongoose');
const { Schema } = mongoose;

const Room= new Schema({
  userOne:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  userTwo:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  messages:[{
    type:Schema.Types.ObjectId,
    ref:"Message"
  }],
});

module.exports = mongoose.model('Room', Room);