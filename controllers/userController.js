const ApiError = require("../Errors/ApiError")
const userServices = require("../services/userService")

class userControllers{
    async registration(req,res){
        console.log(req.body);
        const {password,name,mail} = req.body

        const {image} = req.files
        console.log(mail,password,'uup');
        const response =await userServices.registration(mail,password,name,image)
        return res.json(response)
}
async login(req,res,next){
    const {mail,password,name} = req.body


    const response =await userServices.login(mail,password,name)
    if (response instanceof ApiError) {
        return next(response)
    }
    res.cookie('refreshToken',response.refreshToken,{maxAge:30*24*60*60*1000,httpOnly:true})
    return res.json(response)
}
async getAll(req,res){
    const response =await userServices.getAll()
    return res.json(response)
}
async getOne(req,res){
    const {id} = req.body
    console.log(id,'oop4');
    const response =await userServices.getOne(id)
    return res.json(response)
}

async logout(req,res){
  
    const {refreshToken} = req.cookies

    const response =await userServices.logout(refreshToken)
    res.clearCookie('refreshToken')
console.log(response,'iiii');
    return res.json(response)
    
    
}


async refresh(req,res,next){
        
    const {refreshToken} = req.cookies
   console.log(refreshToken);
    const response =await userServices.refresh(refreshToken)
    if (response instanceof ApiError) {
        return next(response)
    }
    res.cookie('refreshToken',response.refreshToken,{maxAge:30 * 24 * 60 * 60 * 1000,httpOnly:true})
    return res.json(response)


}

}
module.exports = new userControllers()