const Token = require("../models/token")

const jwt = require('jsonwebtoken')
class tokenServices{

    async generateUpdateToken(dto){ 
        try {
            const candidate =await Token.findOne({user:dto.id})
            const {accessToken,refreshToken} = this.generateToken(dto)
            if (!candidate) {
                const candidate2 = new Token({accessToken,refreshToken,user:dto.id})
                await candidate2.save()
                return(
                    {
                        accessToken:candidate2.accessToken,
                        refreshToken:candidate2.refreshToken
                    }
                )
            }else{
                candidate.accessToken = accessToken
                candidate.refreshToken = refreshToken
                await candidate.save()
                return(
                    {
                        accessToken:candidate.accessToken,
                        refreshToken:candidate.refreshToken
                    }
                )
    
            }
        } catch (e) {
            console.log(e);
        }
      }
    
      async  validateRefreshToken(token){
        try {
            const userData =await jwt.verify(token, 'asd12ef');
            return userData;
        } catch (e) {
            return null;
        }  
}
async getOne(refreshToken){
    try {
        const token = Token.findOne({refreshToken})
        return token
    } catch (error) {
        
    }
}
 generateToken(payload){
        
    const accessToken = jwt.sign({...payload},'12fdsf1',{expiresIn:"24h"})
    const refreshToken = jwt.sign({...payload},'asd12ef',{expiresIn:"30d"})
    return {
        accessToken,
        refreshToken
    }


}

async removeToken(refreshToken){
    try {
        const candidate =await Token.deleteOne({refreshToken})
        return candidate
    } catch (error) {
        console.log(error);
    }
   
}
}
module.exports =new tokenServices()