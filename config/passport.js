const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const googleClientId = require('../config/keys').googleClientId;
const googleClientSecret = require('../config/keys').googleClientSecret;

module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    // done is the callback
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    }));

    // Determines which data of the user object should be stored in the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Return the user data
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}