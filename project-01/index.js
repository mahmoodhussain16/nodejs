const express=require("express")

const app=express()
const port=8000;
const users=require('./data.json')
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
    res.json(users)
})
app.route('/api/users/:id').get((req,res)=>{
    const id=Number(req.params.id);
    const user =users.find((user)=>user.id===id);
    return res.json(user)
})
.patch((req,res)=>{
    //Edit user with Id
    res.json({status:"pending"})
})
.delete((req,res)=>{
    //delete user with Id
    res.json({status:"pending"})
});



// app.post('/api/users',(req,res)=>{
//     //TODO create new user
//     return res.json ({status:"pending"})
// })

// app.patch('/api/users/:id',(req,res)=>{
//     //TODO edit user with ID
//     return res.json ({status:"pending"})
// })
// app.delete('/api/users/:id',(req,res)=>{
//     //TODO edit user with ID
//     return res.json ({status:"pending"})
// })

app.listen(port,()=>{console.log(`Server started at port:${port}`)})