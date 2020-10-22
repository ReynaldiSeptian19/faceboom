const {User, Post} = require("../models/index")

class Controller{
    static readUser(req,res){
        if(req.session.isLoggedIn === true){
            // console.log(req.session)
            res.render('user',{
                name:req.session.name,
                age:req.session.age,
                pict:req.session.profile_pict
            })
        }else{
            res.redirect("/login")
        }
        // User.findAll({
        //     include: Post
        // })
        // .then(data =>{
        //     // console.log(data)
        //     res.render("user",{user:data})
        // })
        // .catch(err =>{
        //     res.send(err)
        // })
    }

    static login(req,res){
        if(req.query.err){
            res.render('login',{
                errorLogin: true
            })
        }else{
            res.render('login',{
                errorLogin: false
            })
        }
    }


    static postLogin(req,res){
        let requsername = req.body.username
        let reqpassword = req.body.password

        User.findOne({
            where:{
                username: requsername,
                password: reqpassword
            }
        })
        .then(data =>{
            // console.log(data)
            if(data === null){
                res.redirect('/login?err=true')
            }
            else{
                req.session.isLoggedIn = true
                req.session.name = data.name
                req.session.profile_pict = data.profile_pict
                req.session.age = data.age
                req.session.username = data.username
                req.session.password = data.password
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
        console.log(req.session)
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
    
}

module.exports = Controller