const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
       res.render('auth/signup');
});

router.get('/register', (req, res) => {
       res.render('auth/register');
});

router.post('/register', (req, res) => {
       res.send("recieved")
});

module.exports = router;