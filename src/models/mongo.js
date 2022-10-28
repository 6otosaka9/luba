const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new Schema({
    userName: String,
    fullName: String,
    password: String,
    email: String
});
const userSchema = new Schema({
    fullName: String,
    userDni: Number,
    date: { type: Date, default: Date.now },
    amount: Number,
    room: Number,
    from: String,
    to: String,
    adminId: String,
    dateRegistered: { type:Date, default:Date.now },
    archivated: { type: Boolean, default: false }
});

adminSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
adminSchema.methods.comparePassword = (password) => {
    return bcrypt.hashSync(password, this.password);
}

const adminDb = model('admin', adminSchema);
const userDb = model('user', userSchema);

module.exports = { adminDb, userDb }