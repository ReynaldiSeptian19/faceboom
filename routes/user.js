let express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const {User} = require("../models/index")
const multer = require('multer')
const path = require('path')

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

router.get('/',UserController.readUser)
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

// router.get('/editPassword',UserController.getEditPassword)
// router.post('/editPassword',UserController.postEditPassword)

// router.get('/editAge',UserController.getEditAge)
// router.post('/editAge',UserController.postEditAge)

router.get('/editProfilePicture',UserController.getEditProfilePicture)
router.post('/editProfilePicture', upload.single('ProfilePict'),(req,res)=>{
    let obj = {
        ProfilePict: req.file.filename
    }
    console.log(req.file);
    User.update(obj)
    .then(()=>{
        res.redirect('/')
    })
    .catch(err =>{
        res.send(err)
    })
})

// router.get('/delete',User.delete)
module.exports = router