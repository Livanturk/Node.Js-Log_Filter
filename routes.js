const router = require('express').Router()
const todoMainRoute = require('./components/todo/todo.route.js')
const authMainRoute = require('./components/auth/auth.route')
const auth = require('./middlewares/middleware')
const logsMainRoute = require('./components/logs/logs_route.js')

router.use('/test', todoMainRoute)
router.use('/auth', authMainRoute)
router.use('/logs', logsMainRoute)

module.exports = router