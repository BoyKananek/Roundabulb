var User = require('../models/user');
module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    app.get('/edit/profile',isLoggedIn,function(req,res){
        res.render('editProfile.ejs',{
            user: req.user
        });
    })
    
    app.post('/api/update',isLoggedIn,function(req,res){
        User.findOne({'facebookid':req.body.id},function(err,result){
            if(err){
                console.log('Error, find user id');
                console.log(err);
                res.redirect('/profile');
            }else{
                result.update({
                    "summary": req.body.summary,
                    "work": req.body.work,
                    "education" : req.body.education,
                    "place": req.body.place,
                    "contact.email": req.body.email,
                    "contact.mobile": req.body.mobile,
                    "basic_info.gender": req.body.gender,
                    "basic_info.birthdate": req.body.birthdate
                },function(err,result){
                    if(err){
                        console.log(err);
                        res.redirect("/profile");
                    }else{
                        console.log("update profile successully");
                        res.redirect('/profile');
                    }
                })
            }
        });

    });
    
    app.post('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    //logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    //check login
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }
}