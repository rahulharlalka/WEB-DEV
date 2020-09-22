//http://mongodb.github.io/node-mongodb-native/3.1/quick-start/quick-start/

const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology:true
});

const fruitSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"no name specified"]
  },
  rating: {
    type: Number,
    min : 1,
    max :10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit({
  name: "kela",
  rating: 6,
  review: "good"
});

fruit.save();


// const personSchema = new mongoose.Schema({
//   name: String,
//   age: Number
// });

// const Person = mongoose.model("Person", personSchema);
// const person = new Person({
//   name: "rahul",
//   age: 22
// });

// person.save();


Fruit.updateOne({_id:"5f687b79f854932d302a6e67"},{"name":"peach"},function(err){
  if(err)
  {
    console.log("error");
  }else{
    console.log("no error");
  }

});

Fruit.deleteMany({name:"apple"},function(err){
  if(err)
    console.log("error");
  else
    console.log("no error");
});




