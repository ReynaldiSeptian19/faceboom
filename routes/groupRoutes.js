const GroupController = require('../controllers/groupController')
const router = require('express').Router()

router.get('/', GroupController.showGroup)
router.get('/add', GroupController.addForm)
router.post('/add', GroupController.add)
router.get('/:id', GroupController.groupPage)
router.get('/edit/:id', GroupController.editForm)
router.post('/edit/:id', GroupController.edit)
router.get('/delete/:id', GroupController.delete)

module.exports = router