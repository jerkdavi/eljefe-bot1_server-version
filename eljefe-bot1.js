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
		finalString += '**User Info:**\nUser name: **' + user.username + '**\nUser ID: **' + user.id + '**\n';

		var userCreated = user.createdAt.toString().split(' ');
		finalString += 'Date created **' + userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3] + '**\n';

		if(userData[user.id].messagesSent === 1){ finalString += 'Message sent to this server: **' + userData[user.id].messagesSent + '** message'; }
		else{ finalString += 'Message sent to this server: **' + userData[user.id].messagesSent + '** messages'; }
		return finalString;
	}

	bot.on('message', function(message){
		var sender = message.author;
		var input = message.content.toUpperCase();

		if((sender.id === '781250071215472640') || (sender.id === '781277535232458763')){
			console.log('Sender is a bot!');
			return;
		}

		if(input === prefix + 'HELP'){
			message.delete();
			message.channel.send({embed:{
				title:'<help',
				description:commandsList,
				color:0x2471A3
			}})
		}
		if(input === prefix + 'COMMANDS'){
			message.delete();
			message.channel.send({embed:{
				title:'<commands',
				description:commandsList,
				color:0x2471A3
			}})
		}

		if(input === prefix + 'PING'){
			message.delete();
			message.channel.send({embed:{
				title:'<ping',
				description:`Ping successful! The bot ${bot.user.tag}! is online!`,
				color:0x2471A3
			}})
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
				sender.send({embed:{
					title:swearword,
					description:'Hey! Word **' + swearword + '** is not allowed on our server. Please don\'t use it!',
					color:0x2471A3
				}})
				return;
			}
		}

		if(input.startsWith(prefix + 'USERINFO')){
			message.delete();
			var uicommand = input.toString().split(' ');
			if(!uicommand[1]){
				message.channel.send({embed:{
					title:'<userinfo',
					description:userInfo(sender),
					color:0x2471A3
				}})
			}
			// !!!***JAKO BITNO!!!*** Složiti za ostale usere
		}

		if(input.startsWith(prefix + 'CLR')){
			message.delete();
			var clrcommand = input.toString().split(' ');
			if(!clrcommand[1]){
				message.channel.send({embed:{
					title:'<clr ?',
					description:'Error! Please specify the number of messages to clear e.g. <clr 10',
					color:0x2471A3
				}})
				return;
			}
			if(clrcommand[1] === 0){
				message.channel.send({embed:{
					title:'<clr '+clrcommand[1],
					description:'Error! Cannot delete 0 messages. Specify a number greater than 0.',
					color:0x2471A3
				}})
				return;
			}
			if(sender.id === '764170607004745739'){
				nmb=Number(clrcommand[1]);
				message.channel.bulkDelete(nmb),true.then(message => {
					console.log(`${msg.size} is deleted!`)
				}).catch(err=>{
					console.log(err)
				})
			}
			else{
				message.channel.send({embed:{
					title:'<clr '+clrcommand[1],
					description:'You do not have permissions to request the deletion of messages on this server!',
					color:0x2471A3
				}})
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
		channel.send({embed:{
			title:'Welcome!',
			description:`Hey ${member}, welcome to **ElJefe Discord Server**! Make sure to read and follow all rules.`,
			color:0x2471A3
		}})
	});

	bot.on('guildMemberRemove', function(member){

		console.log('User ' + member.user.username + ' has left the server!');
		var channel = bot.channels.cache.get('783416981776498748');
		channel.send({embed:{
			title:'Farewell!',
			description:`User ${member.user.username} left the **ElJefe Discord Server**. We're sorry to see you go :disappointed_relieved:.`,
			color:0x2471A3
		}})
	});

	bot.login(process.env.DISCORD_TOKEN);
