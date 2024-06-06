const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordPattern: { type: Array, required: true },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date }
});

UserSchema.methods.isLocked = function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
};

UserSchema.methods.comparePassword = function(candidatePassword) {
    return JSON.stringify(this.passwordPattern) === JSON.stringify(candidatePassword);
};

module.exports = mongoose.model('User', UserSchema);
