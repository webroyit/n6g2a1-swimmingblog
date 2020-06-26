const { response } = require("express");

module.exports = {
    ensureAuth: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else{
            // Redirect the user to login page if they did not login
            res.redirect('/');
        }
    }
}