const express=require("express");
const axios=require("axios");
const cors = require('cors');
const path=require("path");
const fetch = require('node-fetch');
//databse code
const db=require("./db");
const fs = require("fs");
const app=express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))

//setting view engine and folder for view
app.set("view engine",'ejs')
app.set("views",path.join(path.join(__dirname,"views")))

//routes
app.get("/",async(req,res)=>{
    const collectionName="blogs"
    let database=await db.getDb();
    const collection=database.collection(collectionName);
    //initialising cursor
    const cursor=collection.find({});
    //recieiving the blogs in array format;
    let blogs=await cursor.toArray();
    res.render("blog",{blogs})
})

app.get("/blog",async(req,res)=>{
    // try{
    // const githubLink = 'https://github.com/Kalaiselvan23/blogPosts/blob/main/hello.md';
    // const [, , owner, repo, , ...filePathParts] = githubUrl.split('/');
    // const filePath = filePathParts.join('/');
    // const response=await axios.get(`https://api.github.com/repo/${owner}/${repo}/contents/${filePath}`)
    // }
    // catch
    // {
    //     console.log("error occured")
    // }
    const resp = await fetch('https://github.com/Kalaiselvan23/blogPosts/blob/main/helloText.txt');
    const textResp = await resp.text();
    res.json(textResp);
})

app.get("/addPost",(req,res,next)=>{  
    res.render("addPost")
})

app.listen(8080,()=>console.log("Server is running on Port 8080..."))