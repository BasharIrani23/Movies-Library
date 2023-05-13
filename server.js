"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.get("/", handleHome);
app.get("/favorite", handleFavorite);

//Create a route with a method of get and a path of /. The callback should use the provided JSON data.
const jsonData = require("./Movie Data/data.json");

//Home Page Endpoint: “/”
function handleHome(req, res) {
  let test = new Movie(jsonData);
  res.json(test);
}
//Favorite Page Endpoint: “/favorite”
function handleFavorite(req, res) {
  res.send("Welcome to Favorite Page");
}

// handle 404 errors
function handle404(req, res, next) {
  res.status(404).json({
    statusCode: 404,
    message: "Page not found!",
  });
}

// handle 500 errors
function handle500(err, req, res, next) {
  res.status(500).json({
    statusCode: 500,
    message: "Internal server error!",
  });
}

//Create a constructor function to ensure your data follow the same format.
function Movie(ex) {
  this.title = ex.title;
  this.poster_path = ex.poster_path;
  this.overview = ex.overview;
  return this;
}

//Listen
app.listen(3003, () => {
  console.log("Server listening on port 3003");
});
