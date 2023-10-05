
const jwt = require('jsonwebtoken')
const ApiError = require('../Errors/ApiError')
const tokenServices = require("../services/tokenServices")

module.exports =async function(req,res,next){
    try {
       
        const token1 = req.headers.authorization
        if (!token1) {
            return next(ApiError.unauthorized())
        }
        const token = token1.split(' ')[1]
        
        if (!token) {
            return next(ApiError.unauthorized())
        }
        
        const verify =await tokenServices.validateAccessToken(token)
        if (!verify) {
            return next(ApiError.unauthorized())
        }
        req.user = verify
        next()
    } catch (error) {
        return next(ApiError.unauthorized())
    }

}