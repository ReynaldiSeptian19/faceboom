const express = require('express')
const routes = require('./routes/index')
const app = express()
const session = require('express-session')
const port = 3000
// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: './pictures/',
//     filename: function(req, file, callback){
//         callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage
// }).single('profilePict')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
  }))

// app.use((req, res, next)=>{

// next()
// })

app.use('/', routes)

app.listen(port, () => { console.log(`Listening to port:${port}`)})
