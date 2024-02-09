const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name: {
        type: string,
        required:[true,"nombre"]
    },
    email: {
        type: string,
        required:[true,"email "],
        unique: true
    },
    password: {
        type: string,
        required:[true,"nombre"]
    },
    isAdmin: {
        type: boolean,
        default: false
    },

    },
    {

    timestamps: true

})


module.exports = mongoose.model('User', userSchema)