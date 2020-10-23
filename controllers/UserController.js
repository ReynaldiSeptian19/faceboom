const {User, Post} = require("../models/index")

class Controller{
    static readUser(req,res){
            res.render('user',{
                name:req.session.name,
                age:req.session.age,
                pict:req.session.profile_pict,
                // post:req.session.post
            })        
            res.redirect("/login")
    }

    static login(req,res){
        res.render('login',{
        })
    }

    static postLogin(req,res){
        let requsername = req.body.username
        let reqpassword = req.body.password

        User.findOne({
            where:{
                username: requsername,
                password: reqpassword
            },
            include: Post
        })
        .then(data =>{
            console.log(data)
            if(data === null){
                res.redirect('/login?err=true')
            }
            else{
                req.session.isLoggedIn = true
                // req.session.id = data.id
                req.session.name = data.name
                req.session.profile_pict = data.profile_pict
                req.session.age = data.age
                req.session.username = data.username
                req.session.password = data.password
                // for(let i = 0; i<data.Posts.length; i++){
                //     req.session.post = data.Posts[i]
                // }
                res.redirect('/')
            }
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static getRegister(req, res){
        res.render('register')
    }
    static postRegister(req, res){
        let obj = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            age: req.body.age
        }
        User.create(obj)
        .then(() => {
          res.redirect('/login')
        })
        .catch(err => {
          res.send(err)
        })
    }
    static setting(req,res){
        if(req.session.isLoggedIn === true){
        // console.log(req.session)
        res.render('setting',{
            name:req.session.name,
            age:req.session.age,
            pict:req.session.profile_pict,
            username:req.session.username,
            password:req.session.password
        })
        }else{
            res.redirect("/login")
        }
    }

    static getEditName(req, res){
        if(req.session.isLoggedIn === true){
            res.render('editname',{
                name:req.session.name
            })
        }else{
            res.redirect('/login')
        }
    }

    static postEditName(req, res) {
        let username = req.session.username
        req.session.name = req.body.name
        let obj = {
         name: req.body.name
        }
        User.update(obj, {
          where: {
            username: username
          },
        })
        .then(() => {
          res.redirect('/setting')
        })
        .catch(err => {
          res.send(err)
        })
      }

      static getEditUsername(req, res){
        if(req.session.isLoggedIn === true){
            res.render('editusername',{
                username:req.session.username
            })
        }else{
            res.redirect('/login')
        }
    }

    static postEditUsername(req, res) {
        let username = req.session.username
        req.session.username = req.body.username
        let obj = {
         username: req.body.username
        }
        User.update(obj, {
          where: {
            username: username
          },
        })
        .then(() => {
          res.redirect('/setting')
        })
        .catch(err => {
          res.send(err)
        })
      }

      static logout(req, res){
        // console.log(req.session)
        req.session.destroy((err)=>{
            if(err){
                res.send(err)
            }else{
            res.redirect('/login')
            }
        })
    }

    static getEditProfilePicture(req, res){
        res.render('editProfilePict',{
            pict:req.session.profile_pict
        })
    }

    static getEditPassword(req, res){
        if(req.session.isLoggedIn === true){
            res.render('editPassword',{
                password:req.session.password
            })
            }else{
                res.redirect('/login')
            }
    }

    static postEditPassword(req, res) {
        let username = req.session.username
        req.session.password = req.body.password
        let obj = {
         password: req.body.password
        }
        User.update(obj, {
          where: {
            username: username
          },
        })
        .then(() => {
          res.redirect('/setting')
        })
        .catch(err => {
          res.send(err)
        })
      }

    static getEditAge(req, res){
    if(req.session.isLoggedIn === true){
        res.render('editage',{
            age:req.session.age
        })
        }else{
            res.redirect('/login')
        }
      }
    
      static postEditAge(req, res) {
        let username = req.session.username
        req.session.age = req.body.age
        let obj = {
         age: req.body.age
        }
        User.update(obj, {
          where: {
            username: username
          },
        })
        .then(() => {
          res.redirect('/setting')
        })
        .catch(err => {
          res.send(err)
        })
      }

    static delete(req, res){
        let username = req.session.username
        User.destroy({
            where:{
                username
            }
        })
        .then(result =>{
            res.redirect('logout')
        })
        .catch(err=>{
            res.send(err)
        })
    }
}

module.exports = Controller