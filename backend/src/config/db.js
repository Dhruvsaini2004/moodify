const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(process.env.MONGOOSE_STR)
    console.log("Database connected!!")
}

module.exports = connectDB