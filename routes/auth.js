import usermodel from '../models/user.js '    //mai usermodel use kar raha hun user ky bajay
import express from 'express';
import bcrypt from "bcryptjs"
// import User from './../models/user';


const router = express.Router()


// SignUp
router.post("/register",async(req,res)=>{
    try {
         const {email,username,password}=req.body

        const hashpassword=bcrypt.hashSync(password)
        const user=usermodel({email,username,password:hashpassword})
         await user.save().then(()=>{
            res.status(200).json({message:"Sign Up Successfull"})})

    } catch (error) {
        res.status(200).json({message:"User already exists"})
        console.log(error);
    
    }
})

//Login
router.post("/login",async(req,res)=>{
   try { 
   
    
     const user=await usermodel.findOne({email:req.body.email})
     console.log("USER",user);
     
     if(!user){
        return res.status(200).json({message:"Please signUp first"})
     }
     const isPasswordCorrect = await bcrypt.compareSync(req.body.password,user.password)
     console.log("Ispassword correct ",isPasswordCorrect);
     
     if(!isPasswordCorrect){
       return res.status(200).json({message:"Password is not correct"})
        
     }
   //   const id= user._id
   //   console.log("id ... ",id);
     
    
     const {password, ...others}=user._doc
  
     res.status(200).json({others})
   } catch (error) {
    res.status(400).json({message:"user not register"})
    console.log("User not register");
    
    console.log("Error from login routes",error);

    
   }
    
})



export default router