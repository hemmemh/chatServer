const UserDto = require("../dtos/tokenDto")
const ApiError = require("../Errors/ApiError")
const uuid = require('uuid')
const User  = require("../models/User")
const bccrypt = require("bcrypt")
const fs = require('fs')
const tokenServices = require("../services/tokenService")
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = require('../utils/config');
const path = require("path")
class userServices{


    async registration(mail,password,name,image){
        try {
         console.log(image, typeof image,'5gg');
            const candidate = await User.findOne({mail:mail})
           
            if (candidate) {
                return ApiError.BadRequest("имейл уже занятttt")
             }
            const cryptPass =await bccrypt.hash(password,4)
      
            const imagePath = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname,'..','static',`users`)
            if (!fs.existsSync(filePath)) {
              fs.mkdirSync(filePath,{recursive:true})
            }     
            image.mv(path.resolve(filePath,imagePath))
        
            const responce = new User({mail,password:cryptPass,name,image:imagePath})
            await responce.save()
            
  
           
       
           
            
         
        
     
            const dto = new UserDto(responce)
            const tokens =await tokenServices.generateUpdateToken(dto)
            return tokens
        } catch (e) {
            console.log(e);
        }
      }
      async login(mail,password){
        try {
  
            const candidate = await User.findOne({mail})
            
            const pass = candidate ? await bccrypt.compare(password,candidate.password) : null
    
            if (!candidate || !pass) {
                return ApiError.BadRequest('неверен email или пароль')
            }
           
            const dto = new UserDto(candidate)
            const tokens = tokenServices.generateUpdateToken(dto)
      
            return tokens
        } catch (error) {
            console.log(error);
        }
    }
      async getOne(id){
        try {
  
        const response =await User.findOne({_id:id})
        return response
        } catch (error) {
            console.log(error);
        }
        
    }

    async getAll(){
      try {
          const response =await User.find({})
          return response
      } catch (e) {
          console.log(e);
      }
    }

      async refresh(refreshToken){
        try {
          console.log(refreshToken ,'tyyytt');
        if (!refreshToken) {
          return ApiError.BadRequest("имейл уже занят")
        }
        const response =await tokenServices.validateRefreshToken(refreshToken)
        const tokenFromDataBase =await tokenServices.getOne(refreshToken)
        if (!response || !tokenFromDataBase) {
            return ApiError.unauthorized()
       
        }
        const user =await  User.findOne({_id:response.id})
        const DtoUSer = new UserDto(user)
        const tokens =await tokenServices.generateUpdateToken(DtoUSer)
      
        return {accessToken:tokens.accessToken,
                refreshToken:tokens.refreshToken}
     
        } catch (error) {
            console.log(error);
        }
        
      } 
      async logout(refreshToken){
        try {
          const token =await tokenServices.removeToken(refreshToken)
        return token
        } catch (e) {
            console.log(e);
        }
        
      }
  
}
module.exports =new userServices()