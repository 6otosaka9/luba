const express = require('express');
const router = express.Router();
const mongoose = require('../database');

router.get('/', async (req, res) => {
    res.render('pages/home')
});

module.exports = router;