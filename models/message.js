const mongoose = require('mongoose');
const { Schema } = mongoose;

const Message= new Schema({
    name:{type:String,required:true},
    text:{type:String,required:true},
    image:{type:String,default:''},
    date:{type:String,required:true},
    room:{
        type:Schema.Types.ObjectId,
        ref:"Room"
      },
});

module.exports = mongoose.model('Message', Message);