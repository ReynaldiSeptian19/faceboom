let express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const {User, Post} = require("../models/index")
const multer = require('multer')
const path = require('path')
const logedIn = require('../middleware/login')

//multer
const storage = multer.diskStorage({
    destination: './publics/uploads/',
    filename: function(req, file, callback){
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only image'))
        }
    }
})

router.get('/',logedIn,UserController.readUser)
router.get('/login',UserController.login)
router.post('/login',UserController.postLogin)
router.get('/logout',UserController.logout)


router.get('/register',UserController.getRegister)
router.post('/register',UserController.postRegister)

router.get('/setting',UserController.setting)

router.get('/editName',UserController.getEditName)
router.post('/editName',UserController.postEditName)

router.get('/editUsername',UserController.getEditUsername)
router.post('/editUsername',UserController.postEditUsername)

router.get('/editPassword',UserController.getEditPassword)
router.post('/editPassword',UserController.postEditPassword)

router.get('/editAge',UserController.getEditAge)
router.post('/editAge',UserController.postEditAge)

router.get('/editProfilePicture',UserController.getEditProfilePicture)
router.post('/editProfilePicture', upload.single('ProfilePict'),(req,res)=>{
    let username = req.session.username
    req.session.profile_pict = req.file.filename
    User.findOne({
        where:{
            username
        }
    })
    .then(data=>{
        data.profile_pict = req.file.filename
        data.save()
        res.redirect('/')
    })
    .catch(err =>{
        console.log(err)
        res.send(err)
    })
})

// router.get('/addPost', UserController.addPost)
// router.post('/addPost', upload.single('Post'),(req, res) => {
//     let username = req.session.username
//     let id = req.session.id
//     req.session.post = req.file.filename
//   let data = {
//     picts:req.file.filename,
//     UserId:id
//   }
//   Post.create(data)
//     .then(() => {
//       res.redirect(`/`)
//     })
//     .catch(err => {
//       res.send(err)
//     })
// })

router.get('/delete',UserController.delete)

module.exports = router