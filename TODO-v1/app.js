const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const _ = require("lodash");

app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-Rahul:test123@cluster0.yvnd2.mongodb.net/todolistDB", {useNewUrlParser: true});

const itemsSchema = {name: String};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({name: "welcome to your todo list"});
const item2 = new Item({name: "hit to add item"});
const item3 = new Item({name: "hit checkbox to delete"});

const defaultItems = [item1, item2, item3];

const listsSchema={
    name:String,
    items: [itemsSchema],
};
const List= mongoose.model("List",listsSchema);


app.get("/", function (req, res) {

    Item.find({}, function (err, foundItems) {
        if (foundItems.length == 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) console.log("error");
                else console.log("successfully logged items to the databse");
            });
            res.redirect("/");
        } else {
            res.render("list", {
                listTitle: "Today",
                newListItems: foundItems
            });
        }
    });
});

app.post("/", function (req, res) {
    const itemName = req.body.newItem;
    const listName= _.capitalize(req.body.list);

    const item=new Item({name:itemName});
    if(listName==="Today"){
        item.save();
        res.redirect("/");
    }
    else{
        List.findOne({name:listName},function(err,foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+listName);
        })
    }  

});


app.get("/:customListName",function(req,res){
    const customListName=_.capitalize(req.params.customListName);

    List.findOne({name:customListName},function(err,foundList){
        if(!err){
            if(!foundList){
                const list= new List({
                    name:customListName,
                    items:defaultItems
                });            
                list.save();
                res.redirect("/"+customListName);
            }else{
                res.render("list", {
                    listTitle: foundList.name,
                    newListItems: foundList.items
                });
            }                
        }
    });
});


app.post("/delete",function(req,res){
    const checkedItemId=req.body.checkbox;
    const listName=_.capitalize(req.body.listName);
    if(listName==="Today")
    {
        Item.findByIdAndDelete(checkedItemId,function(err){
            if(err) {
                console.log("error deleting");                     
            }
            else {
                console.log("sucessfully deleted");
                res.redirect("/");   
            }
    
        });
    }else {
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}},function(err){
                if(!err){
                    res.redirect("/"+listName);
                }
        });
    };    
});

app.get("/about", function (req, res) {
    res.render("about");
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
    console.log("server ready");
});