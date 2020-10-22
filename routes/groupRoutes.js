const ContentController = require('../controllers/contentController')
const GroupController = require('../controllers/groupController')
const router = require('express').Router()
// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: './public/uploads',
//     filename: function(req, file, callback){
//         callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

router.get('/', GroupController.showGroup)
router.get('/add', GroupController.addForm)
router.post('/add', GroupController.add)
router.get('/:id', GroupController.groupPage)
router.get('/:id/addContent', ContentController.addContent)
router.post('/:id/addContent', ContentController.add)
router.get('/edit/:id', GroupController.editForm)
router.post('/edit/:id', GroupController.edit)
router.get('/delete/:id', GroupController.delete)

module.exports = router