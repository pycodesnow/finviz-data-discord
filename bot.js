const finviz = require('finviz');
const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
	//console shows bot login
	console.log(`Logged in as ${client.user.tag}!`);
});

//get auth token to login
client.login(auth.token);

//bot reads and responds
client.on('message', msg => {
	var firstletter = msg.content.slice(0,1);
	if (firstletter == '!'){
		console.log('first letter is !')
		var tickersymbol = msg.content.slice(1).toUpperCase();
		console.log(tickersymbol);

		finviz.getStockData(tickersymbol)
			.then(msg.reply("Getting live Stock Update for " +tickersymbol+"please wait..."))
			//returns json data without symbols
			.then(data => msg.reply(tickersymbol + JSON.stringify(data, ['Prev Close', 'Market Cap', 'Price'], 2).replace(/["{}]+/g,""))) 
			.catch(err => msg.reply("Can't find this stock symbol " + tickersymbol ))
	}
});
