const UserDto = require("../dtos/tokenDto")
const ApiError = require("../Errors/ApiError")

const User  = require("../models/User")
const bccrypt = require("bcrypt")
const tokenServices = require("./tokenService")
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = require('../utils/config');
const room = require("../models/room")

class roomServices{
    async createOrUpdateRoom(userIdOne,userIdTwo){
      console.log(userIdOne,userIdTwo);
        try {
            if (!userIdOne || !userIdTwo) {
              return ApiError.BadRequest('недостаточно данных')
            }
            let candidate = await room.findOne({$or:[{userOne:userIdOne,userTwo:userIdTwo},{userOne:userIdTwo,userTwo:userIdOne}]}).populate('messages')
            if (!candidate) {
              candidate =  new room({userOne:userIdOne,userTwo:userIdTwo})
              candidate.save()
             }
            return candidate
        } catch (e) {
            console.log(e);
        }
      }

      async getAll(){
  
          try {
            const response =await room.find({})
            return response
            

          } catch (e) {
              console.log(e);
          }
        }
   
  
}
module.exports =new roomServices()