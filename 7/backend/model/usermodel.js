const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:["user","admin"]
    }
});

module.exports = model("User", UserSchema);
