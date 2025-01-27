import mongoose from "mongoose";

const userSchema=mongoose.Schema({

    email:{
        type: String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        // unique:true
    },
    password:{
        type:String,
        required:true
    },
    list:[
        {
            type:mongoose.Types.ObjectId,
            ref:"List"
        }
    ]
},{timestamps: true})


const usermodel=mongoose.model("usermodel",userSchema)
export default usermodel