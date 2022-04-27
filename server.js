'use strict'
const express = require('express');
const movieData = require('./data.json');
const app = express();
const port = 3000;

app.get('/', handleData);

function handleData(req, res) {
    // res.send("Welcom to Favorit page1");
    let result = [];
    let newMovie = new Movie(movieData.title, movieData.poster_path, movieData.overview);
    result.push(newMovie);
    res.json(result);
}

app.get('/favorite', handleFavorite);

function handleFavorite(reg, res) {
    res.send("Welcom to Favorit page");

}

app.listen(port, handleListener);
function handleListener() {
    console.log(`"i am a live on port ${port}"`);
}

app.use('/error', (req, res) => res.send(error()));

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





function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;

}