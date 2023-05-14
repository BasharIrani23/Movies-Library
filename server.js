"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const axios = require("axios");
const jsonData = require("./Movie Data/data.json");
const pg = require("pg");
const client = new pg.Client(process.env.DBURL);

client
  .connect()
  .then(() => console.log("connection successed"))
  .catch((e) => console.error("connection failed " + e));

//************************* *****************************/

app.get("/", handleHome);
app.get("/favorite", handleFavorite);
app.get("/trending", handleTrending);
app.get("/search", handleSearching);
app.get("/searchPeople", handlePeopleSearching);
app.get("/searchTvShow", handleSearchTv);
app.post("/addMovie", handleAddMovie);
app.get("/getMovies", handleGetMovies);
//************************* *****************************/

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

//Home Page Endpoint: “/”
function handleHome(req, res) {
  let test = new Movie(jsonData);
  res.json(test);
}

//Favorite Page Endpoint: “/favorite”
function handleFavorite(req, res) {
  res.send("Welcome to Favorite Page");
}

//Create a constructor function to ensure your data follow the same format.
function Movie(ex) {
  this.id = ex.id;
  this.title = ex.title;
  this.release_date = ex.release_date;
  this.poster_path = ex.poster_path;
  this.overview = ex.overview;
  return this;
}

//Listen
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

async function handleTrending(req, res) {
  const data = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.APIKEY}`
  );

  res.status(200).json({
    results: data.data,
  });
}

async function handleSearching(req, res) {
  const searchQuery = req.query.search;
  const data = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&query=${searchQuery}`
  );
  console.log(data.data);
  res.status(200).json({
    results: data.data,
  });
}

async function handlePeopleSearching(req, res) {
  const searchPeopleQuery = req.query.search;
  const data = await axios.get(
    `https://api.themoviedb.org/3/search/person?api_key=${process.env.APIKEY}&query=${searchPeopleQuery}`
  );
  console.log(data.data);
  res.status(200).json({
    results: data.data,
  });
}

async function handleSearchTv(req, res) {
  const searchTvShow = req.query.search;
  const data = await axios.get(
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.APIKEY}&query=${searchTvShow}`
  );
  console.log(data.data);
  res.status(200).json({
    results: data.data,
  });
}

function handleAddMovie(req, res) {
  const userInput = req.body;
  const sql = `insert into movies(title, comments) values($1, $2) returning *`;
  const handleValueFromUser = [userInput.title, userInput.comments];
  //here we can use await client  or .then to avoid promise hell
  client
    .query(sql, handleValueFromUser)
    .then((data) => {
      res.status(201).json(data.rows);
    })
    .catch((err) => console.log(err));
}

// //////////////get req
function handleGetMovies(req, res) {
  const sql = `SELECT * FROM movies`;
  client
    .query(sql)
    .then((data) => {
      console.log(data);
      res.json({
        data: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send("Error in the server at <br>" + err);
    });
    
}
