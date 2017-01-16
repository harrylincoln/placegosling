var Twitter = require('twitter');
var request = require('request');
var Q = require('q');
var cheerio = require('cheerio');
var childProc = require('child_process');
// var sharp = require('sharp');
var Faced = require('faced');
var faced = new Faced();
require('./env.js');

// facial recognition with cmake, make (GCC), pkg-config
faced.detect('simon.jpg', function (faces, image, file) {
  if (!faces) {
    return console.log("No faces found!");
  }

  var face = faces[0];

  console.log(
    "Found a face at %d,%d with dimensions %dx%d",
    face.getX(),
    face.getY(),
    face.getWidth(),
    face.getHeight()
  );
});

// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN,
//   access_token_secret: process.env.TWITTER_TOKEN_SECRET
// });

// var str = '';
// function doTwitterParse() {
//   var deferred = Q.defer();
//   client.get('search/tweets', {q: 'ryan%20gosling', count: 10}, function(error, data, response) {
//     if (!error) {
//       // console.log(data.statuses);
//       var statuses = data.statuses;

//       for (var i = 0; i < statuses.length; i++) {
//         var words = statuses[i].text.split(' ');

//         for (var j = 0; j < words.length; j++) {
//           var value = words[j];
          
//           if (value.includes('https://t.co')) {
//             console.log('string getting saved --> ', value);
//             str = value;
//             deferred.resolve();
//             return true;
//           }
//         }
//       }
//     } else {
//       console.log(error);
//     }
//   });
//   return deferred.promise;
// }
// doTwitterParse().then(function() {
//   console.log('promise returned and here is the string -->', str);
//   request(str, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var htmlBod = body;
//       var $ = cheerio.load(htmlBod);
//       var img = $('meta[property="og:image"]').attr('content');
//       console.log('found it!', $('meta[property="og:image"]').attr('content'));
//     }
//   });
// });

