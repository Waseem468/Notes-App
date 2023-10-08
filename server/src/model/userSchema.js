const mongoose=require("mongoose");
// const bcrypt=require("bcrypt");

const UserSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      }
},
{
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    },
    timestamps: true
})
const User= new mongoose.model("user", UserSchema);
module.exports= User;