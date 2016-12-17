var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../app/models/user');
var configAuth = require('./auth');

module.exports = function(passport){
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        });
    });

    passport.use(new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   : ['id','displayName','picture.type(large)', 'emails']

    },function(token,refreshToken,profile,done){
        process.nextTick(function(){
            User.findOne({'id': profile.facebookid},function(err,user){
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null,user);
                }else{
                    var newUser = new User();
                    newUser.facebookid = profile.id;
                    newUser.token = token;
                    newUser.name = profile.displayName
                    newUser.contact.email = profile.emails[0].value;
                    newUser.picture = profile.photos[0].value;

                    newUser.save(function(err){
                        if(err){
                            throw err;
                        }
                        return done(null,newUser);
                    });
                }
            });
        });
    }
    ))
}