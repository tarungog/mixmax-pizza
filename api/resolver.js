var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');

//The API that returns the in-email representation.
module.exports = function(req, res) {
  console.log("resolver ran");
  var term = req.query.text.trim();
  console.log(term);
  handleSearchString(term, req, res);
};


function handleSearchString(term, req, res){   
    //searches spotify
    var spotify = "https://api.spotify.com/v1/search?q=" + term + "&type=track"
    console.log(spotify);
    request({'url': spotify}, json=true, function call(err, resp, body) {
        console.log('error:', err); // Print the error if one occurred
        console.log('statusCode:', resp && resp.statusCode); // Print the response status code if a response was received
        console.log(typeof body);
        body = JSON.parse(body);
        console.log(body["tracks"])
        console.log(body["tracks"]["items"][0]["album"]["artists"][0]["external_urls"]["spotify"])
        var song = body["tracks"]["items"][0]["album"]["artists"][0]["external_urls"]["spotify"];
        var song2 = song.split("/");
        var toPrint =  "<iframe src=\"https://embed.spotify.com/?uri=spotify:artist:" + song2[4] + "\"width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\"></iframe>";
        console.log(toPrint);
        res.json({"body" : toPrint});
    });
}
