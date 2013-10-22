exports.action = function(data, callback, config, SARAH){
	var url = null;
	var txt = "L'action a échoué";

  switch(data.command){
	case 'random':
		url = 'http://www.chucknorrisfacts.fr/facts/alea';
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
		txt  = getRandomchuck($);
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

var getRandomchuck = function($){
  // var chuck = '';
chuck = $('#factslist div.factbody').first().remove('div').text();  

// On remplace le chuck pour la lecture
chuck = chuck.replace(/Votez/gi, "");
chuck = chuck.replace(/10/gi, "");
chuck = chuck.replace(/7.*/gi, "");
chuck = chuck.replace(/8.*/gi, "");
chuck = chuck.replace(/6.*/gi, "");
  chuck = chuck.replace(/9.*/gi, "");
return chuck.replace(/chuck norris/gi, "tcheuck norrice");
  // return chuck;
}