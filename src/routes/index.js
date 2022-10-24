const express = require('express');
const router = express.Router();
const mongoose = require('../database');

router.get('/', async (req, res) => {
    console.log(mongoose)
});

module.exports = router;