'use strict'
require('dotenv').config();
const express = require('express');
const cores = require('cors');
const axios = require('axios').default;
const apiKey = process.env.API_KEY;





const movieData = require('./Movie Data/data.json');
const app = express();
app.use(cores());
const port = 3005;

//routes
app.get('/', handleData);
app.get('/favorite', handleFavorite);
app.use('/error', (req, res) => res.send(error()));
app.listen(port, handleListener);
//------
app.get('/trending', handleTrending);
app.get('/search', handleSearch);
app.get('/id', handleId);
app.get('/image', handleImage);


//function2
function handleTrending(req, res) {

    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`;
    //    axios.get().then().catch();
    axios.get(url)
        .then(result => {
            // console.log("11", result);
            // console.log(result.data.results);
            let trender = result.data.results.map(trend => {
                return new Trend(trend.id, trend.title, trend.release_date, trend.poster_path, trend.overview);
            })
            res.json(trender);

        })
        .catch((error) => {
            console.log(error);
            res.send("Inside cach");
        });
}

function handleSearch(req, res) {
    let movName = req.query.movName;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movName}&page=2`;
    //    axios.get().then().catch();
    axios.get(url)
        .then(result => {
            // console.log("11", result);
            // console.log(result.data.results);
            res.json(result.data.results);

        })
        .catch((error) => {
            console.log(error);
            res.send("Inside cach");
        });
}

function handleId(req, res) {
    let id = req.query.id;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&page=2`;
    //    axios.get().then().catch();
    axios.get(url)
        .then(result => {
            // console.log("11", result);
            // console.log(result.data.results);
            console.log(result.data);
            res.json(result.data);

        })
        .catch((error) => {
            console.log(error);
            res.send("Inside cach");
        });
}

function handleImage(req, res) {
    let id = req.query.id;
    const url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}&language=en-US`;
    //    axios.get().then().catch();
    axios.get(url)
        .then(result => {
            // console.log("11", result);
            // console.log(result.data.results);
            console.log("ggggg");
            console.log(result.data);
            res.json(result.data);

        })
        .catch((error) => {
            console.log(error);
            res.send("Inside cach");
        });
}









//function1


function handleData(req, res) {
    // res.send("Welcom to Favorit page1");
    let result = [];
    let newMovie = new Movie(movieData.title, movieData.poster_path, movieData.overview);
    result.push(newMovie);
    res.json(result);
}


function handleFavorite(reg, res) {
    res.send("Welcom to Favorit page");

}

function handleListener() {
    console.log(`"i am a live on port ${port}"`);
}


//handel Error
app.use(function (err, req, res, text) {
    console.log(err.stack);
    res.type('taxt/plain');
    res.status(500);
    res.send("Sorry something wrong");
});

app.use(function (req, res, text) {
    res.status(404);
    res.type('taxt/plain');
    res.send("not found");
});





//constructor
function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;

}
function Trend(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}