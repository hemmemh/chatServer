const Router = require('express')
const roomController = require('../controllers/roomController')

const router = new Router()



router.post('/createOrUpdate',roomController.createOrUpdateRoom)

module.exports = router