exports.action = function(data, callback, config, SARAH){
	var url = null;
	var txt = "L'action a échoué";

  switch(data.command){
	case 'random':
		url = 'http://www.lapunaise.fr/aleatoires';
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
		txt  = getRandomproverbe($);
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

var getRandomproverbe = function($){
  // var proverbe = '';
proverbe = $('p.proverbe').first().find('a').text();  // On remplace le proverbe pour la lecture
return proverbe;
  // return proverbe;
}