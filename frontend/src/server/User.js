const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    strokeStatus: {
        type: String
    }
})

const User = mongoose.model("UserData", UserSchema)
module.exports = User