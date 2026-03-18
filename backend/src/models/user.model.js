const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is requires"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is requires"],
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel