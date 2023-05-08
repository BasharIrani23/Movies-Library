"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

//app.get("/", (req, res) => {
//  console.log(`testing the first URL`);
//  res.send(`Testing the First`);
//});
//app.listen(3003, () => console.log(`Up and Running on port 3003`));

//app.get("/", handleHome);
//app.get("/favorite", handleFav);
//******** */

//Create a route with a method of get and a path of /. The callback should use the provided JSON data.
const jsonData = require("./Movie Data/data.json");

app.get("/", (req, res) => {
  let test = new Movie(jsonData);
  res.json(test);
});

//Favorite Page Endpoint: “/favorite”
app.get("/favorite", (req, res) => {
  res.send("Welcome to Favorite Page");
});

// handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({
    statusCode: 404,
    message: "Page not found!",
  });
});
// handle 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    statusCode: 500,
    message: "Internal server error!",
  });
});

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





// function handleFav(req, res) {
//   console.log("testing the favorite url");
//   res.send("welcome to favorites");
// }

// //error 500 test here in home
// function handleHome(req, res) {
//   const jsonData = require("./Movie Data/data.json");
//   const index = req.query.index;
//   const movie = jsonData[index];
//   const newMovie = new Movie(movie.title, movie.poster_path, movie.overview);
//   res.json({ newMovie: newMovie });
// }
