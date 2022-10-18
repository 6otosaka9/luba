const { request } = require('express');
const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
       res.render('users/add')
});

router.post('/add', async (req, res) => {
       res.send('received')
       const {userName, userDNI, fromv, tov, room, amount} = req.body;

       const newUser = {
              userName,
              userDNI: parseInt(userDNI),
              fromv,
              tov,
              room: parseInt(room),
              amount: parseInt(amount),
              archivated: false
       };

       console.log(newUser)
       await pool.query('INSERT INTO users set ?', [newUser])
});


module.exports = router;