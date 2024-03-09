const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        if(db){
            console.log("Database Connected.");
        }
    } catch (error) {
        console.log(error);
    };
};

module.exports = connectDB;