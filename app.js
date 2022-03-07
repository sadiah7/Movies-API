const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express(); //making the web app

const apiKey = `${process.env.API_KEY}`;
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true })); //taking form input

//setting view engine and static folders
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(PORT, function () {
  console.log("Server Started at Port 5000");
});

app.get("/", function (req, res) {
  res.render("index", { movies: null, error: null });
});

app.post("/", function (req, res) {
  let Title = req.body.title;
  let type = req.body.type;
  let plot = req.body.plot;

  let url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${Title}&type=${type}&plot=${plot}`;

  request(url, function (err, response, body) {
    if (err) {
      res.render("index", { movies: null, error: err });
    } else {
      let movies = JSON.parse(body);
      let movieTitle = movies.Title;
      let year = movies.Released;
      let moviePlot = movies.Plot;
      let poster = movies.Poster;
      let rating = movies.imdbRating;
      let awards = movies.Awards;
      let lang = movies.Language;
      console.log(movies);

      res.render("index", {
        movies: movies,
        title: movieTitle,
        year: year,
        plot: moviePlot,
        poster: poster,
        rating: rating,
        awards: awards,
        lang: lang,
        error: null,
      });
    }
  });
});
