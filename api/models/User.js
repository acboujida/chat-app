const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        minlength: [3, 'Username must be at least 3 characters long.'],
        maxlength: [30, 'Username cannot exceed 30 characters.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [6, 'Password must be at least 6 characters long.'],
    }} ,{timestamps: true});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});


const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel