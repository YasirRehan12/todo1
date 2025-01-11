import express from "express"
import connectDb from "./conection/conn.js"
import auth from './routes/auth.js'
import list from './routes/list.js'
import cors from "cors"
const app=express()





connectDb();
app.use(express.json())
app.use(cors())
const port=8000



app.use('/api/v1',auth)
app.use("/api/v2",list)



app.get('/',(req,res)=>{
    res.send("hellow word")
})


app.listen(port,(req,res)=>{
     
    console.log(`Server is connected at port http://localhost:${port}`);
    
})