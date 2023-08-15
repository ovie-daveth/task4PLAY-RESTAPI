const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const connectDB = async () => {
    try {
        const connect =  await mongoose.connect(process.env.MONGOOSE_URL)
        if(!connect){
            console.log("connected FAILED")
        }
        console.log("connected to MongooDB ...")
    } catch (error) {
        console.log("connection to MongooDB failed: " + error.message)
    }
}

module.exports = connectDB