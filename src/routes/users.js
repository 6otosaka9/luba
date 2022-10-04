const { request } = require('express');
const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
       res.render('users/add')
});

router.post('/add', (req, res) => {
       res.send('received')
       const data = req.body;

       if (data.payed == "si") {
              data.payed = true;
       } else if (data.payed == "no") data.payed = false;

       console.log(data)
});

module.exports = router;