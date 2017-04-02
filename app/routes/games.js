var express = require('express');
var router = express.Router();

// mongoose setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/game');

var Game = require('../models/game');

// on routes that end in /games
// ==============================================================================================================
router.route('/')
    // create a game (accessed at POST http://localhost:8080/api/games)
    .post(function(request, response) {
        var game = new Game();              // create a new instance of the Game model
        game.name = request.body.name;      // set the game's name (comes from the request)

        // save the game and check for errors
        game.save(function(err) {
            if(err)
                response.send(err);
            
            response.json({ message: 'Game created!'});
        });
    })

    // get all the games (accessed at GET http://localhost:8080/api/games)
    .get(function(request, response) {
        Game.find(function(err, games) {
            if(err)
                response.send(err);
            response.json(games);
        });
    });

// on routes that end in /games/:game_id
router.route('/:game_id')
    // get the game with that id (accessed at GET http://localhost:8080/api/games/:game_id)
    .get(function(request, response) {
        Game.findById(request.params.game_id, function(err, game) {
            if(err)
                response.send(err);
            response.json(game);
        });
    })

    // update the game with this id (accessed at PUT http://localhost:8080/api/games/:game_id)
    .put(function(request, response) {
        // use our game model to find the game we want
        Game.findById(request.params.game_id, function(err, game) {
            if(err)
                response.send(err);
            game.name = request.body.name;      // update the game's info

           // save the game
            game.save(function(err) {
                if(err)
                    response.send(err);
                response.json({ message: 'Game updated!'});
            });
        });
    })

    // delete the game with this id (accessed at DELETE http://localhost:8080/api/games/:game_id)
    .delete(function(request, response) {
        Game.remove({
            _id: request.params.game_id
        }, function(err, game) {
            if(err)
                response.send(err);
            response.json({ message: 'Successfully deleted'});
        })
    });

module.exports = router;