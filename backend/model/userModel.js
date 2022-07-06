const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill the name']
    },
    email: {
        type: String,
        required: [true, 'Please fill the email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please fill the password']
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema);