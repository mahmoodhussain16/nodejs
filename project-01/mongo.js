const express=require("express")

const userRouter=require('./routes/user');
const { connectMongoDb } = require("./connection");
const {logReqRes} = require("./middleware")

const app=express()
const port=8001; 

//Connection mongoose 
connectMongoDb("mongodb://127.0.0.1:27017/data-app-1")

//middleware - plugin
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));

//Routes
app.use('/users',userRouter)

//server
app.listen(port,()=>{console.log(`Server started at port:${port}`)})
