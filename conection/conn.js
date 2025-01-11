import mongoose from "mongoose";



const Mongo_url="mongodb+srv://Yasir:12@cluster0.zi96u.mongodb.net/Amazonweb"

const connectDb=async (req,res)=>{
  try {
      await mongoose.connect(Mongo_url).then( ()=>{
          console.log("database conected");
       
          
      } )
  } 
  catch (error) {
  
    console.log("Database is not connected : ",error);
    // res.status(400).json({message:"database is not connected"})
  
    
  }
}


export default connectDb