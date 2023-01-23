const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
var _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

let app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postsTitle = "Posts"

mongoose.set("strictQuery", true)
mongoose.connect("mongodb://localhost:27017/collectiveBlogDB")

const postsSchema = new mongoose.Schema({
  title: String,
  post: String,
  author: String
})

const Post = mongoose.model("Post", postsSchema)

app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    if (!err) {

      res.render("home", {
        homeContent: homeStartingContent, 
        posts: posts,
        postsTitle: postsTitle
      })
    }

  })
})

app.get("/about", function(req, res) {
  res.render("about", { aboutContent: aboutContent })
})

app.get("/compose", function(req, res) {
  res.render("compose")
})

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    post: req.body.postBody,
    author: req.body.postAuthor
  }
  
  const newPost = new Post(post)

  newPost.save(function(err) {
    if(!err) {
      res.redirect("/")
    }
  })
})

app.get("/posts/:postId", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName)
  
  posts.forEach(function(post) {
    const postTitleLowerCase = _.lowerCase(post.title)

    if (postTitleLowerCase == requestedTitle) {
      res.render("post", {
        postTitle: post.title,
        postBody: post.body,
        postAuthor: post.author
      })
    } 
  })
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
