const router = require('express').Router()
const user = require('./user')
const post = require('./post')
const group = require('./groupRoutes')


router.use('/', user)
// router.use('/post', post)
router.use('/group', group)

module.exports = router