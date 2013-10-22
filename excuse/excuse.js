exports.action = function(data, callback, config, SARAH){
	var url = null;
	var txt = "L'action a échoué";

  switch(data.command){
	case 'random':
		url = 'http://1001excuses.fr/excuse-au-hasard';
		break;
	default:
		break;
  }
  
  if(url){
	var request = require('request');
	request({ 'uri' : url }, function (err, response, body){    
		if (err || response.statusCode != 200) {
		  callback({'tts': txt});
		  console.log('ERRR');
		  return;
		}
		var $ = require('cheerio').load(body, { xmlMode: true, ignoreWhitespace: false, lowerCaseTags: false });
		txt  = getRandomexcuse($);
		console.log(txt);
		callback({'tts': txt});
		return;
	});
  } else {
	callback({'tts': txt});
	}
}


  // ------------------------------------------
  //  SCRAPING
  // ------------------------------------------

var getRandomexcuse = function($){
  // var excuse = '';
excuse = $('div.excuse').first().find('p').text();

return 'Il a dit, ' + excuse;
  // return excuse;
}