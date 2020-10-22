const router = require('express').Router()
const user = require('./user')
const post = require('./post')
const group = require('./groupRoutes')
const content = require('./contentRoutes')




router.use('/', user)
// router.use('/post', post)
router.use('/group', group)
router.use('/content', content)

module.exports = router