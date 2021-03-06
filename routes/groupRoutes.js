const ContentController = require('../controllers/contentController')
const GroupController = require('../controllers/groupController')
const { Content } = require('../models/index')
const router = require('express').Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: './public/pictures/',
    filename: function(req, file, callback){
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
  storage: storage
}).single('post')

router.get('/', GroupController.showGroup)
router.get('/add', GroupController.addForm)
router.post('/add', GroupController.add)
router.get('/:id', GroupController.groupPage)
router.get('/:id/addContent', ContentController.addContent)
router.post('/:id/addContent', upload, (req, res) => {
  let id = +req.params.id
  let data = {
    post: req.file.filename,
    comment: req.body.comment,
    GroupId: id
  }
  console.log(req.file)
  Content.create(data)
    .then(() => {
      res.redirect(`/group/${id}`)
    })
    .catch(err => {
      res.send(err)
    })
})
router.get('/edit/:id', GroupController.editForm)
router.post('/edit/:id', GroupController.edit)
router.get('/delete/:id', GroupController.delete)

module.exports = router