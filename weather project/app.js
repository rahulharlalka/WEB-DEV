const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const { request } = require("http");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
// Get request

app.get("/",function(req,res){

   res.sendFile(__dirname+"/index.html");
    
});

// POST METHOD


app.post("/" ,function(req,res){
    const query=req.body.cityname;
    const appid="398e6872bed3b6fd53ed5fa1d81216cc";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>the temperature is "+ temp +" degree celcius</h1>");
            res.write("<p>the weather description is "+weatherDescription+"</p>");
            res.write("<img src="+imageUrl+">");
            res.send();
        })
    })
})





app.listen(3000,function(req,res){
    console.log("server is running on port 3000");
})