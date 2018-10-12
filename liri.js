require("dotenv").config();

var request = require("request");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require('./keys');
var fs = require('fs');
var command = process.argv[2];
var commandParam = process.argv.slice(3).join(" ");


//This function processes the input commands
function processCommands() {
    switch (command) {
        case 'concert-this':
            concertThis();
            break;
        case 'spotify-this-song':
            spotifyThis();
            break;
        case 'movie-this':
            movieThis();
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("Invalid command. Please type any of the following commnds: concert-this spotify-this-song movie-this or do-what-it-says");
    }
}

function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + commandParam + "/events?app_id=04986f7c93838994a17f468de0ad9a86";
    request(queryUrl, function (error, response) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(response.body);
            if (!data.length) {
                var output = "There are no upcoming concerts for " + commandParam;
            } else {
                for (var i = 0; i < data.length; i++) {
                    var date = data[i].datetime;
                    var format = 'L';
                    var result = moment(date).format(format);

                    //Put the whole enchalada in a variable
                    var output = (" \n\n" + data[i].venue.name +
                        "\n" + data[i].venue.city +
                        "\n" + result);
                    //Write to terminal/log.txt
                    console.log(output);
                    writeLog(output);
                }
            }

        }
    });
}

//    * `spotify-this-song`

function spotifyThis() {
    if (commandParam === "") {
        commandParam = "Ace of base The Sign";
    }
    var spotify = new Spotify(keys.spotify);
    spotify.search({
        type: "track",
        query: commandParam

    },
        function (error, data) {
            if (error) {
                console.log(error);
            } else {
                var tracks = data.tracks.items;

                for (var i = 0; i < tracks.length; i++) {
                    var artistArray = tracks[i].artists;
                    var artists = [];
                    for (var j = 0; j < artistArray.length; j++) {
                        artists.push(artistArray[j].name);

                    }

                    //Put the whole enchalada in a variable
                    var output = ("\n\nArtists: " + artists.join(", ") +
                        "\nSong: " + tracks[i].name +
                        "\nAlbum: " + tracks[i].album.name +
                        "\nPreview: " + tracks[i].preview_url);
                    //Write to terminal/log.txt
                    console.log(output);
                    writeLog(output);

                }
            }
        }
    )

}
//    * `movie-this`

function movieThis() {

    if (commandParam === "") {
        commandParam = "Mr.Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + commandParam + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {


        if (!error && response.statusCode === 200) {

            //Put the whole enchalada in a variable
            var output = (" \n\nTitle: " + JSON.parse(body).Title +
                "\nRelease year: " + JSON.parse(body).Year +
                "\nIMDB Rating: " + JSON.parse(body).imdbRating +
                "\nProduced in: " + JSON.parse(body).Country +
                "\nLanguages: " + JSON.parse(body).Language +
                "\nPlot: " + JSON.parse(body).Plot +
                "\nActors: " + JSON.parse(body).Actors);
            //Write to terminal/log.txt
            console.log(output);
            writeLog(output);

            // Omitted tomato rating, although it technically works omdb doesn't provide info
            // leaving the value "N/A" after testing several movie titles
            // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
        }
    });

}

//    * `do-what-it-says`

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArray = data.split(",");
            command = dataArray[0];
            commandParam = dataArray[1];
            processCommands();
        }
    });
}

// function for writing to log file
function writeLog(output) {
    fs.appendFile("log.txt", output, function (err) {
        if (err) {
            return console.log(err);
        }

    });
}

processCommands();













