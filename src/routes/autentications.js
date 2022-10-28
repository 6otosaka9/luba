const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

const router = express.Router();

router.get('/signup', isNotLoggedIn, (req, res) => {
       res.render('auth/signup');
       
});

router.post('/signup', passport.authenticate('local.signup', {
       successRedirect: '/',
       failureRedirect: '/signup',
       passReqToCallback: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
       res.render('auth/signin');
});

router.post('/signin', passport.authenticate('local.signin', {
       successRedirect: '/',
       failureRedirect: '/signin',
       passReqToCallback: true
}));

router.get('/logout', isLoggedIn, async (req, res) => {
       req.logOut((err, data) => {
              if (err) console.log(err)
       });
       res.redirect('/signin');
});

module.exports = router;