const express=require("express")
const mongoose=require('mongoose')
const app=express()
const port=8001; 

//Connection mongoose 
mongoose.connect('mongodb://127.0.0.1:27017/data-app-1')
    .then(()=>console.log("Mongodb Connected"))
    .catch((err)=>console.log("mongo error",err));

//Schema 
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    jobTitle:{
        type:String,
        
    },
    gender:{
        type:String,
        
    },
})
//Model 
const User =mongoose.model("user",userSchema);

//middleware - plugin
app.use(express.urlencoded({extended:false}));

app.use((req, res, next)=>{
    console.log("Hello from middleware 1");
   
     next();
});
app.use((req, res, next)=>{
    console.log("Hello from middleware 2");
  
    next();
});

//routes

app.get('/',(req,res)=>{
    res.send("Home page")
})
app.get('/users',async(req,res)=>{
    const allDbUsers= await User.find({});
    const html=`<ul>
    ${allDbUsers.map((user)=>`<li>${user.firstName}-${user.email}</li>`).join("")}
    </ul>`;
    res.send(html)

})

//Rest Api

app.get('/api/users',async(req,res)=>{
    const allDbUsers= await User.find({});
    return res.json(allDbUsers);
    
})



app.route('/api/users/:id').get(async(req,res)=>{
   const user=await User.findById(req.params.id);
    return res.json(user)
})

.patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id,{lastName:"changed"});
            return res.json({ status: 'success' });
        })
    
.delete(async(req,res)=>{
    await User.findByIdAndDelete(req.params.id) ,res.json({status:"success"})

});

app.post('/api/users',async(req,res)=>{
    //create new user
    const body=req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
        return res.status(400).json({msg:"All fields are required"}
            
        )
    }
    const result=await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title,
    });
    return res.status(201).json({msg:"success"});
})

app.listen(port,()=>{console.log(`Server started at port:${port}`)})