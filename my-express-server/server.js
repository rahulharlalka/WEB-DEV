const { response } = require("express");
const express=require("express");
const app=express();

app.get("/",function(request,response){
    response.send("hello");
});

app.get("/contact",function (req, res) {
        res.send("contact me at :-");
    });

app.get("/about",function(res,res){
    res.send("i am ml developer");
});


app.get("/hobbies",function(req,res){
    res.send("badminton");
})

app.listen(3000,function(){
    console.log("sever satrtes")
});