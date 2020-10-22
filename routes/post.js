const express = require('express')
const router = express.Router()
const Post = require('../controllers/PostController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: './publics/pictures/',
    filename: function(req, file, callback){
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
}).single('profilePict')

// router.get('/',Post.readPost)

// router.get('/add',Post.getAdd)
// router.post('/add',Post.postAdd)

// router.get("/delete/:id", Post.delete)