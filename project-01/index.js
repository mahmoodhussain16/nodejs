const express=require("express")
const users=require('./data.json')
const fs=require('fs')
const app=express()
const port=8001; 

//middleware - plugin
app.use(express.urlencoded({extended:false}));

app.use((req, res, next)=>{
    console.log("Hello from middleware 1");
    // return res.json({mgs:"Hello from middleware 1"});
     next();
});
app.use((req, res, next)=>{
    console.log("Hello from middleware 2");
    // return res.json({mgs:"Hello from middleware 1"});
    //  return res.end("Hey")
    next();
});

//routes

app.get('/',(req,res)=>{
    res.send("Home page")
})
app.get('/users',(req,res)=>{
    const html=`<ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html)

})

//Rest Api

app.get('/api/users',(req,res)=>{
    
    res.setHeader('X-my-Name','Mahmood') 
    // ==custom Headers best practice with X append

    return res.json(users)
    
})



app.route('/api/users/:id').get((req,res)=>{
    const id=Number(req.params.id);
    const user =users.find((user)=>user.id===id);
    return res.json(user)
})

.patch((req, res) => {
            return res.json({ status: 'success', user });
        })
    
.delete((req,res)=>{
    //delete user with Id
    res.json({status:"pending"})
});

//post method with postman
app.post('/api/users',(req,res)=>{
    //create new user
    const body=req.body;
    users.push({id:users.length+1,...body});
    fs.writeFile('./data.json',JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status:"success",id:users.length})
    })
})
     // console.log("Body",body);
   
  


// app.patch('/api/users/:id',(req,res)=>{
//     //TODO edit user with ID
//     return res.json ({status:"pending"})
// })
// app.delete('/api/users/:id',(req,res)=>{
//     //TODO edit user with ID
//     return res.json ({status:"pending"})
// })

app.listen(port,()=>{console.log(`Server started at port:${port}`)})