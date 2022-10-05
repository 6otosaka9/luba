const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
       res.render('auth/signup');
});

module.exports = router;