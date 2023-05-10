"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const axios = require("axios");
const jsonData = require("./Movie Data/data.json");

app.get("/", handleHome);
app.get("/favorite", handleFavorite);
app.get("/trending", handleTrending);
app.get("/search", handleSearching);
app.get("/searchPeople", handlePeopleSearching);
app.get("/searchTvShow", handleSearchTv);

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
  // Destructring the object
  // instead of using data.data we use only data
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.APIKEY}`
  );

  const formatedData = data.results.map((e) => {
    return new Movie(e);
  });
  res.status(200).json({
    results: formatedData,
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
