#!/usr/bin/env node

var fs = require('fs');
var replaceStream = require("replacestream");

var emojis='1F385,1F3C3,1F3C4,1F3C7,1F3CA,1F442,1F443,1F446,1F447,1F448,1F449,1F44A,1F44B,1F44C,1F44D,1F44E,1F44F,1F450,1F466,1F467,1F468,1F469,1F46E,1F470,1F471,1F472,1F473,1F474,1F475,1F476,1F477,1F478,1F47C,1F481,1F482,1F483,1F485,1F486,1F487,1F4AA,1F590,1F595,1F596,1F645,1F646,1F647,1F64B,1F64C,1F64D,1F64E,1F64F,1F6A3,1F6B4,1F6B5,1F6B6,1F6C0,261D,270A,270B,270C'.split(',');

var svg_src_path = '../assets/svg/';
var tmp_path = './tmp/';
var emoji_suf;


var colors=[
	[["#f2c7aa","#f8d275"],["#f3d9c7","#f8d275"],["#efb086","#f4bb2d"],["#d99d81","#f4bb2d"],["#f4ae80","#f4bb2d"],["#f2c9a5","#f4bb2d"],["#d69b74","#e8b12b"],["#c28874","#d6a428"],["#e7c0a2","#d6a428"],["#d8a17c","#cb9b25"],["#c99673","#cb9b25"],["#d88147","#cb9b25"],["#dda37c","#ba8e22"],["#c69471","#ba8e22"],["#c18e6b","#9f7a1d"]],
	[["#fbbf67","#f3d7b4"],["#fabe67","#f3d7b4"],["#f9bd67","#f3d7b4"],["#fbb041","#f3d7b4"],["#f2b362","#e7ccab"],["#f2b15d","#e7ccab"],["#efac5d","#e7ccab"],["#e5aa5c","#e7ccab"],["#efac5e","#e7ccab"],["#eda65a","#e7ccab"],["#f2ae53","#e7ccab"],["#e8a041","#e7ccab"],["#eea63b","#e7ccab"],["#dea15a","#d5bd9e"],["#a66604","#d5bd9e"],["#d98415","#d5bd9e"],["#db9249","#cab396"],["#cd7c04","#cab396"],["#c37929","#b9a489"],["#c07929","#b9a489"],["#c57929","#b9a489"],["#cd8d3b","#9e8c75"],["#f2c7aa","#f7e5ce"],["#f3d9c7","#f7e5ce"],["#efb086","#f3d7b4"],["#d99d81","#f3d7b4"],["#f4ae80","#f3d7b4"],["#f2c9a5","#f3d7b4"],["#d69b74","#e7ccab"],["#c28874","#d5bd9e"],["#e7c0a2","#d5bd9e"],["#d8a17c","#cab396"],["#c99673","#cab396"],["#d88147","#cab396"],["#dda37c","#b9a489"],["#c69471","#b9a489"],["#c18e6b","#9e8c75"]],
	[["#fbbf67","#dab790"],["#fabe67","#dab790"],["#f9bd67","#dab790"],["#fbb041","#dab790"],["#f2b362","#cfae89"],["#f2b15d","#cfae89"],["#efac5d","#cfae89"],["#e5aa5c","#cfae89"],["#efac5e","#cfae89"],["#eda65a","#cfae89"],["#f2ae53","#cfae89"],["#e8a041","#cfae89"],["#eea63b","#cfae89"],["#dea15a","#bfa17e"],["#a66604","#bfa17e"],["#d98415","#bfa17e"],["#db9249","#b59878"],["#cd7c04","#b59878"],["#c37929","#a68b6e"],["#c07929","#a68b6e"],["#c57929","#a68b6e"],["#cd8d3b","#8e775e"],["#f2c7aa","#e7d0b6"],["#f3d9c7","#e7d0b6"],["#efb086","#dab790"],["#d99d81","#dab790"],["#f4ae80","#dab790"],["#f2c9a5","#dab790"],["#d69b74","#cfae89"],["#c28874","#bfa17e"],["#e7c0a2","#bfa17e"],["#d8a17c","#b59878"],["#c99673","#b59878"],["#d88147","#b59878"],["#dda37c","#a68b6e"],["#c69471","#a68b6e"],["#c18e6b","#8e775e"]],
	[["#fbbf67","#bb8e67"],["#fabe67","#bb8e67"],["#f9bd67","#bb8e67"],["#fbb041","#bb8e67"],["#f2b362","#b18762"],["#f2b15d","#b18762"],["#efac5d","#b18762"],["#e5aa5c","#b18762"],["#efac5e","#b18762"],["#eda65a","#b18762"],["#f2ae53","#b18762"],["#e8a041","#b18762"],["#eea63b","#b18762"],["#dea15a","#a47d5a"],["#a66604","#a47d5a"],["#d98415","#a47d5a"],["#db9249","#9b7656"],["#cd7c04","#9b7656"],["#c37929","#8e6c4e"],["#c07929","#8e6c4e"],["#c57929","#8e6c4e"],["#cd8d3b","#7a5c43"],["#f2c7aa","#d2b59b"],["#f3d9c7","#d2b59b"],["#efb086","#bb8e67"],["#d99d81","#bb8e67"],["#f4ae80","#bb8e67"],["#f2c9a5","#bb8e67"],["#d69b74","#b18762"],["#c28874","#a47d5a"],["#e7c0a2","#a47d5a"],["#d8a17c","#9b7656"],["#c99673","#9b7656"],["#d88147","#9b7656"],["#dda37c","#8e6c4e"],["#c69471","#8e6c4e"],["#c18e6b","#7a5c43"]],
	[["#fbbf67","#996644"],["#fabe67","#996644"],["#f9bd67","#996644"],["#fbb041","#996644"],["#f2b362","#916141"],["#f2b15d","#916141"],["#efac5d","#916141"],["#e5aa5c","#916141"],["#efac5e","#916141"],["#eda65a","#916141"],["#f2ae53","#916141"],["#e8a041","#916141"],["#eea63b","#916141"],["#dea15a","#865a3c"],["#a66604","#865a3c"],["#d98415","#865a3c"],["#db9249","#7f5539"],["#cd7c04","#7f5539"],["#c37929","#744e34"],["#c07929","#744e34"],["#c57929","#744e34"],["#cd8d3b","#64422c"],["#f2c7aa","#bc9a84"],["#f3d9c7","#bc9a84"],["#efb086","#996644"],["#d99d81","#996644"],["#f4ae80","#996644"],["#f2c9a5","#996644"],["#d69b74","#916141"],["#c28874","#865a3c"],["#e7c0a2","#865a3c"],["#d8a17c","#7f5539"],["#c99673","#7f5539"],["#d88147","#7f5539"],["#dda37c","#744e34"],["#c69471","#744e34"],["#c18e6b","#64422c"]],
	[["#fbbf67","#5d4d40"],["#fabe67","#5d4d40"],["#f9bd67","#5d4d40"],["#fbb041","#5d4d40"],["#f2b362","#58493d"],["#f2b15d","#58493d"],["#efac5d","#58493d"],["#e5aa5c","#58493d"],["#efac5e","#58493d"],["#eda65a","#58493d"],["#f2ae53","#58493d"],["#e8a041","#58493d"],["#eea63b","#58493d"],["#dea15a","#524438"],["#a66604","#524438"],["#d98415","#524438"],["#db9249","#4d4035"],["#cd7c04","#4d4035"],["#c37929","#473b31"],["#c07929","#473b31"],["#c57929","#473b31"],["#cd8d3b","#3d322a"],["#f2c7aa","#948a81"],["#f3d9c7","#948a81"],["#efb086","#5d4d40"],["#d99d81","#5d4d40"],["#f4ae80","#5d4d40"],["#f2c9a5","#5d4d40"],["#d69b74","#58493d"],["#c28874","#524438"],["#e7c0a2","#524438"],["#d8a17c","#4d4035"],["#c99673","#4d4035"],["#d88147","#4d4035"],["#dda37c","#473b31"],["#c69471","#473b31"],["#c18e6b","#3d322a"]]
];

var suf = [null,'1F3FB','1F3FC','1F3FD','1F3FE','1F3FF'];

// Color change loop
colors.forEach(function(replacements,rep_index){

	emoji_suf = suf[rep_index];
	
	// Emoji color change loop 
	emojis.forEach(function(emoji){
		
		var emoji_in = svg_src_path+emoji+'.svg';
		var emoji_out = tmp_path+((emoji_suf)?emoji+'-'+emoji_suf:emoji)+'.svg';

		if (!fs.existsSync(emoji_in)) {
			console.error('"'+emoji_out+'" does not exist.');
		}else{

			var stream = fs.createReadStream(emoji_in,{defaultEncoding: 'utf8'});

			for (var i = 0; i < replacements.length; i++) {
				stream = stream['pipe'](replaceStream(replacements[i][0],replacements[i][1]));
			};
			console.log('Creating: '+emoji_out);
			stream['pipe'](fs.createWriteStream(emoji_out));

		}

	});

});

