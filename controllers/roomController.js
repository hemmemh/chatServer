const ApiError = require("../Errors/ApiError")
const roomService = require("../services/roomService")


class userControllers{
    async createOrUpdateRoom(req,res){
        const {userIdOne,userIdTwo} = req.body
        const response =await roomService.createOrUpdateRoom(userIdOne,userIdTwo)
        if (response instanceof ApiError) {
            return next(response)
        }
        return res.json(response)
}


}
module.exports = new userControllers()