module.exports = {
    ensureAuth: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else{
            // Redirect the user to login page if they did not login
            res.redirect('/');
        }
    },
    ensureGuest: function(req, res, next){
        if(req.isAuthenticated()){
            // Redirect the user to dashboard page if they are login
            res.redirect('/dashboard');
        } else{
            return next();
        }
    }
}