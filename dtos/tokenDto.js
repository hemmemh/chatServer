class UserDto{
    constructor(user){
        this.id = user._id
        this.mail = user.mail
        this.name = user.name
        this.image = user.image
    }
}

module.exports =  UserDto