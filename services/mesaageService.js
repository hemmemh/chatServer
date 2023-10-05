const UserDto = require("../dtos/tokenDto")
const ApiError = require("../Errors/ApiError")
const uuid = require('uuid')
const User  = require("../models/User")
const bccrypt = require("bcrypt")
const tokenServices = require("./tokenService")
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = require('../utils/config');
const room = require("../models/Room")
const message = require("../models/Message")
const fs = require('fs')
const path = require("path")
class messageServices{
    async createMessage({name,text,roomId,date,image}){

        try {
          console.log(name,text,roomId,date,'e222',image);
          console.log(typeof image,'234');
          console.log(image,'ttttttt');
          let imagePath = ''
          if (image) {
            imagePath = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname,'..','static',`messages`)
            if (!fs.existsSync(filePath)) {
              fs.mkdirSync(filePath,{recursive:true})
            }     
            fs.writeFileSync(path.resolve(filePath,imagePath),image)
          }
        


       
            let candidate = new message({name,text,room:roomId,date,image:imagePath})
            let roomCandidate= await room.findOne({_id:roomId})
            roomCandidate.messages.push(candidate._id)
            roomCandidate.save()
            candidate.save()
            return {roomCandidate,image:imagePath}
        } catch (e) {
            console.log(e);
        }
      }
   
  
}
module.exports =new messageServices()