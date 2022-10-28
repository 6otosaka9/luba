const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { adminDb } = require('../models/mongo');

passport.serializeUser((admin, done) => {
    done(null, admin.id);
})
passport.deserializeUser(async (id, done) => {
    const admin = await adminDb.findById(id)
    done(null, admin)
})
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const exist = await adminDb.findOne({ "email": email });
    if (exist) {
        return done(null, false, req.flash('signupMessage', 'The email is alredy taken.'));
    } else {
        const admin = new adminDb();
        admin.userName = req.body.userName
        admin.fullName = req.body.fullName;
        admin.email = email;
        admin.password = admin.encryptPassword(password);
        await admin.save();
        done(null, admin);
    }
}));
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const admin = await adminDb.findOne({email: email});
    if (!admin) {
        return done(null, false, req.flash('signinMessage', 'No user found.'))
    }
    if (admin.comparePassword(password)) {
        done(null, admin);
    } else { 
        return done(null, false, req.flash('signinMessage', 'Incorrect password.'))
    }
}));