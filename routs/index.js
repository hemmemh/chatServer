const Router = require('express')
const router = new Router()
const userRouter  = require('./userRouter')
const roomRouter  = require('./roomRouter')
const messageRouter  = require('./messageRouter')


router.use('/user',userRouter)
router.use('/message',messageRouter)
router.use('/room',roomRouter)

module.exports = router 