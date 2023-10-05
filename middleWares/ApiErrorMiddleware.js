const ApiError = require("../Errors/ApiError");

module.exports = function(err,req,res,next){
    console.log('ttyyyhyh333');
if (err instanceof ApiError) {
    console.log('ttyyyhyh333');
    return res.status(err.status).json({message:err.message,errors:err.error})
}
return  res.status(500).json({message:"Неизвестная ошибка"})
}

