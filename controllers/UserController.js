const {User, Post} = require("../models/index")

class Controller{
    static readUser(req,res){
        if(req.session.isLoggedIn === true){
            res.render('user',{
                name:req.session.name,
                age:req.session.age,
                profile_pict:req.session.profile_pict
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
            console.log(data)
            if(data === null){
                res.redirect('/login?err=true')
            }
            else{
                req.session.isLoggedIn = true
                req.session.name = data.name
                req.session.profile_pict = data.profile_pict
                req.session.age = data.age
                res.redirect('/')
            }
        })
        .catch(err =>{
            res.send(err)
        })
    }
}

module.exports = Controller