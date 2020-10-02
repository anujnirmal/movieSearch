const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");
const http = require('http');
const _ = require("lodash");


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


var movie = "";



app.get("/", function(req,res){
    res.render("home");
});

app.get("/movie", function(req, res){
    res.redirect("/");
});

app.get("/about", function(req, res){
  res.render("about");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.post("/", function(req, res){
    const movieName = _.kebabCase(req.body.movieName);
    const apiKey = "d016f247";
    const url = "/?apikey=" + apiKey + "&t=" + movieName;
    const options = {
        host: "www.omdbapi.com",
        path: url
    }

    callback = function(response) {
        response.on('data', function (data) {
          movie = JSON.parse(data);
        }); 

        response.on('end', function () {
          res.render("movie", {
            movieTitle: movie.Title,
            movieYear: movie.Year,
            movieRated: movie.Rated,
            movieReleased: movie.Released,
            movieRuntime: movie.Runtime,
            movieGenre: movie.Genre,
            movieLanguage: movie.Language,
            movieCountry: movie.Country,
            movieAwards: movie.Awards,
            movieDirector: movie. Director,
            movieActors: movie.Actors,
            moviePlot: movie.Plot,
            movieProduction: movie.Production,
            poster: movie.Poster          
          });
        });
      }
      http.request(options, callback).end();
    
});


app.post("/year", function(req, res){
  const movieName = _.kebabCase(req.body.movieName);
  const year = req.body.year;
  const apiKey = "d016f247";
  const url = "/?apikey=" + apiKey + "&t=" + movieName + "&y=" + year;
  const options = {
      host: "www.omdbapi.com",
      path: url
  }

  callback = function(response) {
      response.on('data', function (data) {
        movie = JSON.parse(data);
      }); 

      response.on('end', function () {
        res.render("movie", {
          movieTitle: movie.Title,
          movieYear: movie.Year,
          movieRated: movie.Rated,
          movieReleased: movie.Released,
          movieRuntime: movie.Runtime,
          movieGenre: movie.Genre,
          movieLanguage: movie.Language,
          movieCountry: movie.Country,
          movieAwards: movie.Awards,
          movieDirector: movie. Director,
          movieActors: movie.Actors,
          moviePlot: movie.Plot,
          movieProduction: movie.Production,
          poster: movie.Poster          
        });
      });
    }
    http.request(options, callback).end();
  
});


app.listen(port, function(){
    console.log("Server Started on port " + port);
});
