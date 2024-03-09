const mongoose = require("mongoose");

const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailStatus: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("User", User);