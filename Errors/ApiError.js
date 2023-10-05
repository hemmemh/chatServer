class ApiError extends Error{

    constructor(status,message,error=[]){
        super()
        this.status =status
        this.message =message
        this.error =error
    }

    static BadRequest(message,error=[]){
        return new ApiError(404,message,error)
    }
    static internal(message,error=[]){
        return new ApiError(400,message,error)
    }  
    static forbidden(message,error=[]){
        return new ApiError(400,message,error)
    } 
    static unauthorized(error=[]){
        return new ApiError(404,'неавторизован',error)
    }   
}

module.exports = ApiError