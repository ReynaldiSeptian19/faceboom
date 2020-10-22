const GroupController = require('../controllers/groupController')
const router = require('express').Router()

router.get('/add', GroupController.addForm)
router.post('/add', GroupController.add)
// router.get('/editGroupName/:id', (req, res) => {res.send('This is edit group name!')})
// router.post('/editGroupName/:id')
// router.get('/delete/:id', (req, res) => {res.send('This is delete group!')})

module.exports = router