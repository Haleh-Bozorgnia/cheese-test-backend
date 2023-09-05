require("dotenv").config()
const {PORT=8000,DATABASE_URL}=process.env
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const cors=require("cors")
const morgan=require("morgan")

// Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json)

//Database
mongoose.connect(DATABASE_URL)
mongoose.connection
.on ("open", ()=> console.log("connected"))
.on("close",()=> console.log("disconnected"))
.on("error",()=> console.log(error))

// Models
const cheeseSchema = new mongoose.Schema({
    name:"string",
    countyr:"string",
    image:"string"
})

const Cheese = mongoose.model("cheeses", cheeseSchema)
// Router
// Index
app.get("/cheese",async (req,res)=>{
    try{
        const cheeses = await Cheese.find({})
        res.json(cheeses)

    } catch(error){
        res.status(400).json({error})
    }
})

 //Delete
 app.use("/cheese/:id", async(req,res)=>{
     try{
         const cheese = await Cheese.findByIdAndDelete(req.params.id)

     }catch(error){
         res.status(400).json({error})
     }
 })
 // Update
 app.put("cheeeses/:id", async(req,res)=>{
     try{
         const cheese = await Cheese.findByIdAndUpdate(req.body.id,req.body,{new:true})
         res.json(cheese)
     } catch(error){
         res.status(400).json({error})
     }
 })

 //Create
 app.post("/cheeses", async(req,res)=>{
     try{
         const cheese = await Cheese.create(req.body) 
         res.json(cheese)

     }catch(error){
         res.status(400).json({error})
     }

 })
 //Show
 app.get("/cheeses:id",async (req,res)=>{
     try{
         const cheese = await Cheese.findById(req.params.id)

     }catch (error){
         res.status(400).json({error})
     }

 })

//Listener
app.listen(PORT,()=> console.log("you connected to server"))