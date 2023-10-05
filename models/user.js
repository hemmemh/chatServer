const mongoose = require('mongoose');
const { Schema } = mongoose;

const User= new Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    mail:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    token:{
        type:Schema.Types.ObjectId,
        ref:"Token"
      },


});

module.exports = mongoose.model('User', User);