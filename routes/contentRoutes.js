const ContentController = require('../controllers/contentController')
const router = require('express').Router()

router.get('/add', ContentController.addContent)

module.exports = router