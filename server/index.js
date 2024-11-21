const http=require("http");
// const fs =require("fs");
// const url=require("url");
const express=require("express")

const app=express();

app.get("/",(req, res)=>{
    return res.send("hello from home page");
})

app.get("/about",(req,res)=>{
    return res.send("About Page"+'Hi'+req.query.name)
})
    

app.listen(8000,()=>console.log("server started"));
// const myServer=http.createServer(app)
// const myServer=http.createServer((req,res)=>{
//     const log=`${Date.now()}: ${req.url} New Req Received\n`;
//     const myUrl=url.parse(req.url,true);
//     console.log(myUrl);
//     fs.appendFile("log.txt",log,(err,data)=>{
//         switch(myUrl.pathname){
//             case "/":
//                 res.end("HomePage");
//                 break;
//             case "/about":
//                 const username=myUrl.query.myname;
//                 const id=myUrl.query.id;
//                 res.end(`Hi,${username}user: ${id}`);
//                 break;
//             default:
//                 res.end("404 Not Found");
//         }
//     }
//    )

// });

