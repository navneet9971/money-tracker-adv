const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs');


const AuthSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Please fill a valid email address']  },
    password: { type: String, required: true },
    image: { 
        data: Buffer, 
        contentType: String 
    } 
});

// Password hashing middleware
AuthSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
           const salt = await bcrypt.genSalt(10)
           const hashedPassword = await bcrypt.hash(this.password, salt)
           this.password = hashedPassword;
           next();
        } catch (err) {
            console.error('Error hashing password:', err);
            next(err); 
        }
    } else {
        next();
    }
});


const Auth = model('Auth', AuthSchema);
module.exports = Auth;
