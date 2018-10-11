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
                console.log("There are no upcoming concerts for " + commandParam);
            }
            
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
                console.log("\nArtists: " + artists.join(", "));
                console.log("Song: " + tracks[i].name);
                console.log("Album: " + tracks[i].album.name);
                console.log("Preview: " + tracks[i].preview_url);
                
                
                
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
    var queryUrl = "http://www.omdbapi.com/?t=" + commandParam + "&y=&plot=short&apikey=trilogy";
    
    request(queryUrl, function(error, response, body) {
        
       
        if (!error && response.statusCode === 200) {
            
            
            console.log("\nTitle: " + JSON.parse(body).Title);
            console.log("Release year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Languages: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
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

// function writeLog() {
//     fs.appendFile("log.txt", , function(err) {

        

//         if (err) {
//           return console.log(err);
//         }
//         console.log("log.txt was updated!");
      
//       });
    
// }

processCommands();





 






