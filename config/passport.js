const GoogleStrategy = require('passport-google-oauth20').Stratery;
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
    }))
}