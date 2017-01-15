var Twitter = require('twitter');
var request = require('request');
var Q = require('q');
var cheerio = require('cheerio')

var client = new Twitter({
  consumer_key: "",
  consumer_secret: "",
  access_token_key: "",
  access_token_secret: ""
});

var str = '';
function doTwitterParse() {
  var deferred = Q.defer();
  client.get('search/tweets', {q: 'ryangosling', count: 10}, function(error, data, response) {
    if (!error) {
      // console.log(data.statuses);
      var statuses = data.statuses;

      for (var i = 0; i < statuses.length; i++) {
        var words = statuses[i].text.split(' ');

        for (var j = 0; j < words.length; j++) {
          var value = words[j];
          
          if (value.includes('https://t.co')) {
            console.log('string getting saved --> ', value);
            str = value;
            deferred.resolve();
            return true;
          }
        }
      }
    } else {
      console.log(error);
    }
  });
  return deferred.promise;
}
doTwitterParse().then(function() {
  console.log('promise returned and here is the string -->', str);
  request(str, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var htmlBod = body;
      var $ = cheerio.load(htmlBod);
      console.log('found it!', $('meta[property="og:image"]').attr('content'));
    }
  });
});

