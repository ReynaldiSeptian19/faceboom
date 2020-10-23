function isLoggedIn(req, res, next){
    if(req.session.isLoggedIn === true){
        next()
    }else{
        req.session.isLoggedIn = false
        res.redirect('/login')
    }
}

module.exports = isLoggedIn