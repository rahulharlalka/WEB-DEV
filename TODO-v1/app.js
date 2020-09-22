const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const mongoose = require("mongoose");



app.set('view engine', "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
    useNewUrlParser: true
});

const itemsSchema = {
    name: String
};

const Item=mongoose.model("Item",itemsSchema);

app.get("/", function (req, res) {

    let day = date.getDate();
    res.render("list", {
        listTitle: day,
        newListItems: newItems
    });
});

app.post("/", function (req, res) {
    newItem = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        newItems.push(newItem);
        res.redirect("/");
    }

});


app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});



app.get("/about", function (req, res) {
    res.render("about");
});


app.listen(3000, () => {
    console.log("server ready");
});