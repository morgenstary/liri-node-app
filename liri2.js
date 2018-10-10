require("dotenv").config();

var request = require("request");
var moment = require('moment');
var command = process.argv[2];
var commandParam = process.argv[3];

// code not working yet


// Make it so liri.js can take in one of the following commands:

//    * `concert-this 

// var artist = process.argv[2];

//This function processes the input commands
function processCommands(command, commandParam) {

    //console.log(commandParam);

    switch (command) {

        case 'concert-this':
            concertThis();
            break;
        case 'spotify-this-song':
            if (commandParam === undefined) {
                commandParam = defaultSong;
            }
            spotifyThis(commandParam);
            break;
        case 'movie-this':
            if (commandParam === undefined) {
                commandParam = defaultMovie;
            }
            movieThis(commandParam);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("Invalid command. Please type any of the following commnds: concert-this spotify-this-song movie-this or do-what-it-says");
    }



    function concertThis() {

        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=04986f7c93838994a17f468de0ad9a86";

        console.log(queryUrl);

        request(queryUrl, function (error, response) {

            if (!error && response.statusCode === 200) {

                var data = JSON.parse(response.body);

                for (var i = 0; i < data.length; i++) {

                    console.log(" \n" + data[i].venue.name);
                    console.log(data[i].venue.city);

                    var date = data[i].datetime;
                    var format = 'L';
                    var result = moment(date).format(format);

                    console.log(result);
                }

            }
        });
    }




//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`


