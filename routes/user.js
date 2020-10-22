let express = require('express')
const router = express.Router()
const User = require('../controllers/UserController')

router.get('/',User.readUser)
router.get('/login',User.login)
router.post('/login',User.postLogin)

// router.get('/logout',User.logout)

// router.get('/add',User.getAdd)
// router.post('/add',User.postAdd)

// router.get('/edit',User.getEdit)
// router.post('/edit',User.postEdit)

// router.get('/delete/:id',User.delete)
module.exports = router