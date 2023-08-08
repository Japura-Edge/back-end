const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const schema = mongoose.Schema

const userSchema = new schema({
    userName: {type: String, required: true},
    profilePic: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    favorites: {type: [String], required: false},
    seller: {type: Boolean, required: false},
    registrationNo: {type: String, required: false},
    faculty: {type: String, required: false},
}, {
    timestamps: true
})

// hashing the password
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model('users', userSchema)

module.exports = User