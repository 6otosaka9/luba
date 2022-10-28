const express = require('express');
const fs = require('fs');
const xlsx = require('xlsx')
const { isLoggedIn } = require('../lib/auth');
const { userDb, adminDb } = require('../models/mongo');
const router = express.Router();

const pool = require('../database');

router.get('/add', isLoggedIn, (req, res) => {
       res.render('users/add')
});

router.post('/add', async (req, res) => {
       const {fullName, userDNI, fromv, tov, room, amount} = req.body;
       const user = new userDb();

       user.fullName = fullName;
       user.userDni = parseInt(userDNI);
       user.from = fromv;
       user.to = tov;
       user.room = parseInt(room);
       user.amount = parseInt(amount);
       user.adminId = req.user._id

       await user.save();
       res.redirect('/users/list');
});

router.get('/list', isLoggedIn, async (req, res) => {
       const users = await userDb.find().lean();
       const Users = []
       for (let i in users) {
             let data = users[i];
              const admin = await adminDb.findById(data.adminId)
              data.adminName = admin.fullName;
              Users.push(data);
       }
       console.log(Users)
       res.render('users/list', {users: users})
});

router.get('/archive/:id', isLoggedIn, async (req, res) => {
       await userDb.findByIdAndUpdate(req.params.id, {$set: {archivated: true}})
       res.redirect('/users/list');
});

router.get('/unarchive/:id', isLoggedIn, async (req, res) => {
       await userDb.findByIdAndUpdate(req.params.id, {$set: {archivated: false}})
       res.redirect('/users/list');
});

/* router.get('/edit/:id', isLoggedIn, async (req, res) => {
       const users = await userDb.findByIdAndUpdate(req.params.id, {$set: {archivated: true}})
       res.redirect('/users/list');
}); */

router.get('/delete/:id', isLoggedIn, async (req, res) => {
       await userDb.findByIdAndDelete(req.params.id)
       res.redirect('/users/list');
});

router.get('/download/excel', isLoggedIn, async (req, res) => {
       const users = await userDb.find().lean();
       const DATA = [];
       for (let i in users) {
              let data = users[i];
              const admin = await adminDb.findById(data.adminId)
              data.adminName = admin.fullName;
              const parsedDate = new Date(data.date)
              DATA.push({
                     name: data.fullName,
                     DNI: data.userDni,
                     from: data.from,
                     to: data.to,
                     room: data.room,
                     amount: data.amount,
                     registred: `${parsedDate.getFullYear()}-${parsedDate.getMonth()+1}-${parsedDate.getDate()}`,
                     "registred by": data.adminName
              });
       }
       const workShet = xlsx.utils.json_to_sheet(DATA);
       const workBook = xlsx.utils.book_new();

       xlsx.utils.book_append_sheet(workBook, workShet, "data")
       xlsx.write(workBook, {bookType: 'xlsx', type: 'buffer'})
       xlsx.write(workBook, {bookType: 'xlsx', type: 'binary'})
       xlsx.writeFile(workBook, 'lubaUserList.xlsx')

      if (fs.existsSync('lubaUserList.xlsx')) {
       var result = res.download('lubaUserList.xlsx')
      }
});

module.exports = router;