require("dotenv").config();

var request = require("request");
var moment = require('moment');




// Make it so liri.js can take in one of the following commands:

//    * `concert-this not set up yet, to test code just run 'node liri.js <artist>' i.e. node liri.js drake
// liri2.js has more code to build this functionality out but doesn't work yet

var artist = process.argv[2];

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



//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`

// console.log(process.argv);

