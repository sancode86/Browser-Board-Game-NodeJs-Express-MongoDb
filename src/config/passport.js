const LocalStrategy = require('passport-local').Strategy;

const User = require('../app/models/user');

module.exports = function (passport){
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function (err, user){
            done(err, user);
        });
    });

    //SignUp
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function(req, email, password, done){
            User.findOne({'email': email}, function(err, user){
            if (err) {return done(err);}
                    if (user) {
                        return done(null, false, req.flash('signupMessage', '¡E-Mail ya registrado!'));
                    }else{
                        var newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.save(function(err){
                            if(err){throw err;}
                            return done(null, newUser);
                        });                
                    }
            })
    }));

    //Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true

        },
        function(req, email, password, done){
            User.findOne({'email': email}, function(err, user){
            if (err) {return done(err);}
                    if (!user) {
                        return done(null, false, req.flash('loginMessage', '¡No existe ese usuario!'));
                    }
                
            if (!user.validatePassword(password)){
                return done(null, req.flash('loginMessage', 'Contraseña incorrecta'));
            }  
            return done (null, user);
            })
        }));


}