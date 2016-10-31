var express = require('express');
var app = express();
var request = require('request');
var url = require('url');

app.get('/pokemon/:name', function(req, response){
  var name = req.params.name;
  console.log(name);
  options = {
    protocol: "http:",
    host: 'pokeapi.co',
    pathname: 'api/v2/pokemon/' + name,
    query: {name: name, count: 10}
  }

  var pokeapiUrl = url.format(options);
  //request(pokeapiUrl).pipe(response);
  request(pokeapiUrl, function(err, res, body){
    var pokemon = JSON.parse(body);
    response.locals = {pokemon: pokemon, name: name};
    response.render('pokemon.ejs');
  });
});
app.listen(8080);
