'use strict';

const passport = require('passport');
const User = require('../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;
const secret = require('../secret/secretFile');

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializationUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err,uesr);
    })
});

passport.use(new FacebbokStrategy({
    clientID: secret.facebook.clientID,
    clientSecret: secret.facebook.clientSecret,
    profileFields: {'email', 'displayName', 'photos'},
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    passReqtoCallback: true

}, (req, token, refreshToken, profile, done) =>{
    User.findOne({facebook:profile.id}, (err,user) => {
        if(err) {
            return done(err);
        }
    })
}));