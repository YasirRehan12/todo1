import mongoose from "mongoose";

const listSchema=mongoose.Schema({

    title:{
        type: String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    user:[
        {
            type:mongoose.Types.ObjectId,
            ref: "usermodel"
        }
    ]

},{timestamps: true})


const List=mongoose.model("List",listSchema)
export default List