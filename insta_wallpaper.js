// modules required
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
// array pictures for urls of images
var pictures = [];

request('https://www.reddit.com/r/wallpaper/', function(err, res, body) {
  // checks if site is running
  if(!err && res.statusCode == 200){
    var $ = cheerio.load(body);
    // jquery searches page for each 'a.title'
    $('a.title').each(function(){
      // targets the href
      var url = $(this).attr('href');
      // -1 is default for error in js; if not error then ...
      // take images from i.imgur as they stay as images
      if(url.indexOf('i.imgur.com')!= -1){
      pictures.push(url);
      };
    });
      console.log(pictures);
      console.log("I scraped " + pictures.length + " wallpapers, enjoy!");
      // for loop to scrape the images to folder
      for(var i = 0; i < pictures.length; i++){
          request(pictures[i]).pipe(fs.createWriteStream('wallpaper/' + i + '.jpg'));
      }
    }
});
