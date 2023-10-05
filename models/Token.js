const mongoose = require('mongoose');
const { Schema } = mongoose;

const Token = new Schema({
  accessToken:{type:String,required:true},
  refreshToken:{type:String,required:true},
  user:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
});

module.exports = mongoose.model('Token', Token);