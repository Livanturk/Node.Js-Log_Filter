const express = require('express')
const router = express.Router()
const logs_controller = require('./logs_controller')

router.get('/logs',logs_controller.list_logs)
router.get('/logs',logs_controller.create_report)
router.post('/logs',logs_controller.add_log)

module.exports = {
    router
}
