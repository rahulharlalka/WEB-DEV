const express=require("express");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})


app.post("/",function(req,res){
    var num1=Number(req.body.input1);
    var num2=Number(req.body.input2);
    var result=num1+num2;
    res.send("the  output of the calculation is " + result);
})

app.listen(3000,function(){
    console.log("server started");
})