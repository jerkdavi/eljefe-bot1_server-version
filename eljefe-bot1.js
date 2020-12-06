	/*jshint esversion: 6 */

	var Discord = require('discord.js');
	var bot = new Discord.Client();
	var fs = require('fs');

	var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
	var profanities = JSON.parse(fs.readFileSync('Storage/profanities.json', 'utf8'));
	var profanities2 = JSON.parse(fs.readFileSync('Storage/profanities2.json', 'utf8'));

	var commandsList = fs.readFileSync('Storage/commands.txt', 'utf8');

	var prefix = process.env.prefix;
	var owner = process.env.ownerID;
	var swearword;

	function userInfo(user){
		var finalString = '';
		finalString += '**User Info:**\n';

		finalString += 'User name: **' + user.username + '**\n';
		finalString += 'User ID: **' + user.id + '**\n';

		var userCreated = user.createdAt.toString().split(' ');
		finalString += 'Date created **' + userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3] + '**\n';

		if(userData[user.id].messagesSent === 1){
			finalString += 'Message sent to this server: **' + userData[user.id].messagesSent + '** message';
		}
		else{
			finalString += 'Message sent to this server: **' + userData[user.id].messagesSent + '** messages';
		}
		return finalString;
	}

	bot.on('message', function(message){
		var sender = message.author;
		var input = message.content.toUpperCase();

		if((sender.id === '781250071215472640') || (sender.id === '781277535232458763')){
			console.log('Sender is a bot!');
			return;
		}

		if(input === prefix + 'HELP' || input === prefix + 'COMMANDS'){
			message.channel.send(commandsList);
		}

		if(input === prefix + 'PING'){
			message.channel.send('Ping successful! The bot is online!');
		}

		if(!userData[sender.id]){
			userData[sender.id] = {
				messagesSent: 0 };
		}
		userData[sender.id].messagesSent++;
		fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
			if(err){
				console.error(err);
			}
		});

		if(!profanities2[sender.id]){
			profanities2[sender.id] = {
				swearwords: 0 };
		}

		for(x = 0; x < profanities.length; x++){
			swearword = profanities[x].toUpperCase();
			if(input.includes(swearword)){

				profanities2[sender.id].swearwords++;
				fs.writeFile('Storage/profanities2.json', JSON.stringify(profanities2), (err) => {
					if(err){
						console.error(err);
					}
				});

				message.delete();
				sender.send('Hey! Word **' + swearword + '** is not allowed on our server. Please don\'t use it!');
				return;
			}
		}

		if(input.startsWith(prefix + 'USERINFO')){

			var uicommand = input.toString().split(' ');
			if(!uicommand[1]){
				message.channel.send(userInfo(sender));
			}
			// !!!***JAKO BITNO!!!*** Složiti za ostale usere
		}

		if(input.startsWith(prefix + 'CLR')){
			var clrcommand = input.toString().split(' ');
			if(!clrcommand[1]){
				message.channel.send('Error! Please specify the number of messages to clear e.g. <clr 10');
				return;
			}
			if(sender.id === '764170607004745739'){
				nmb=Number(clrcommand[1])+1;
				message.channel.bulkDelete(nmb);
			}
			else{
				message.channel.send('You do not have permissions to request the deletion of messages on this server!');
				return;
			}
		}
	});

	bot.on('ready', function(ready){

		console.log(`Logged in as ${bot.user.tag}!`);
		bot.user.setStatus('Online');
	});

	bot.on('guildMemberAdd', function(member){

		console.log('User ' + member.user.username + ' has joined the server!');
		var channel = bot.channels.cache.get('778340125389488169');
		channel.send(`Hey ${member}, welcome to **ElJefe Discord Server**! Make sure to read and follow all rules.`);
	});

	bot.on('guildMemberRemove', function(member){

		console.log('User ' + member.user.username + ' has left the server!');
		var channel = bot.channels.cache.get('783416981776498748');
		channel.send(`User ${member.user.username} left the **ElJefe Discord Server**. We're sorry to see you go :disappointed_relieved:.`);
	});

	bot.login(process.env.DISCORD_TOKEN);
