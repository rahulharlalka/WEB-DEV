const express = require("express")
const mongoose = require("mongoose")
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true
});
const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.use(express.static("public"));

app.route("/articles")
    .get(function (req, res) {
        Article.find(function (err, articles) {
            if (!err) {
                res.send(articles);
            }
        })
    })
    .post(function (req, res) {
        const articleTitle = req.body.title;
        const articleContent = req.body.content;
        const article = new Article({
            title: articleTitle,
            content: articleContent
        });
        article.save(function (err) {
            if (!err)
                console.log("succesfully saved");
            else
                console.log(err);
        });
        res.redirect("/");
    })
    .delete(function (req, res) {
        Article.deleteMany((err) => {
            if (!err)
                console.log("successfully deleted all");
            else
                console.log(err);
        });
        res.redirect("/");
    });



app.route("/articles/:articleTitle")
    .get(function (req, res) {
        const requestedArticleTitle = req.params.articleTitle;
        Article.findOne({
            title: requestedArticleTitle
        }, function (err, article) {
            if (!err) {
                if (article)
                    res.send(article);
                else
                    res.send("no article found");
            }

        })
    })
    .put(function (req, res) {
        Article.update({
                title: req.params.articleTitle
            }, {
                title: req.body.title,
                content: req.body.content
            }, {
                overwrite: true
            },
            function (err) {
                if (!err) {
                    res.send("succesfully updated")
                }

            });
    })
    .patch(function (req, res) {
        Article.update({
                title: req.params.articleTitle
            }, {
                $set: req.body
            },
            function (err) {
                if (!err)
                    res.send("sucessfully updates");
                else
                    res.send(err);
            })
    })
    .delete(function(req,res){
        Article.deleteOne({title:req.params.articleTitle},function(err){
            if(!err)
                res.send("successfully deleted");
            else
                res.send(err);
        })
    });





app.listen(3000, function () {
    console.log("server runnin on port 3000");
});