import mongoose from "mongoose";

const userDataSchema = mongoose.Schema( {
    userName : String,
    email : String,
    password : String,
    resetToken : String,
    resetTokenExpiry : Date
});

export const userData = mongoose.model("users", userDataSchema);