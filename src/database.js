const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://oto:otodb@cluster0.zwnj30i.mongodb.net/?retryWrites=true&w=majority').then(db => console.log('db is connected'))
    .catch(err => console.error(err))