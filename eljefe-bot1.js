	/*jshint esversion: 6 */

	var Discord = require('discord.js');
	var bot = new Discord.Client();
	var fs = require('fs');

	var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
	var profanities = JSON.parse(fs.readFileSync('Storage/profanities.json', 'utf8'));
	var profanities2 = JSON.parse(fs.readFileSync('Storage/profanities2.json', 'utf8'));

	var commandsList = fs.readFileSync('Storage/commands.txt', 'utf8');
	bot.commands = new Discord.Collection();

	fs.readdir('./commands/', (err, files) => {
		if(err){
			console.error(err);
		}
			
		var jsfiles = files.filter(f => f.split('.').pop() === 'js');
		if(jsfiles.length <= 0) { return console.log('No commands found!') }
		else { console.log(jsfiles.length + ' commands found!'); }
		
		jsfiles.forEach((f, i) => {
			var cmds = require(`./commands/${f}`);
			console.log(`Command ${f} loading...`);
			bot.commands.set(cmds.config.command, cmds);
		})
		
	})
	
	var prefix = process.env.prefix;
	var owner = process.env.ownerID;
	var swearword;

	function userInfo(user){
		var finalString = '';
		finalString += '**User Info:**\nUser name: **' + user.username + '**\nUser ID: **' + user.id + '**\n';

		var userCreated = user.createdAt.toString().split(' ');
		finalString += 'Date created **' + userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3] + '**\n';

		finalString += 'Message sent to this server: **' + userData[user.id].messagesSent + '** messages';
		return finalString;
	}

	bot.on('message', function(message){
		var sender = message.author;
		var input = message.content.toUpperCase();
		var cont = input.slice(prefix.length).split(' ');
		console.log('cont: '+cont);
		var args = cont.slice(1);
		console.log('args: '+args);
		
		if(!input.startsWith(prefix)){
			console.log('Wrong prefix!');
			return;
		}

		var cmd = bot.commands.get(cont[0]);
		console.log('cmd: '+cmd);
		if(cmd) {
			cmd.run(bot, message, args);
			console.log('If passed!');
		}

		if((sender.id === '781250071215472640') || (sender.id === '781277535232458763')){
			return;
		}

		if(input === prefix + 'HELP'){
			message.channel.send({embed:{
				description:commandsList,
				color:0x2471A3
			}});
		}

		if(input === prefix + 'COMMANDS'){
			message.channel.send({embed:{
				description:commandsList,
				color:0x2471A3
			}});
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

		for(var x = 0; x < profanities.length; x++){
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
					description:'Hey! Word **' + swearword + '** is not allowed on our server. Please don\'t use it!',
					color:0x2471A3
				}});
				return;
			}
		}

		if(input.startsWith(prefix + 'USERINFO')){
			var uicommand = input.toString().split(' ');
			if(!uicommand[1]){
				message.channel.send({embed:{
					description:userInfo(sender),
					color:0x2471A3
				}});
			}
			// !!!***JAKO BITNO!!!*** Složiti za ostale usere
		}

		if(input.startsWith(prefix + 'CLR')){
			var clrcommand = input.toString().split(' ');
			if(!clrcommand[1]){
				message.channel.send({embed:{
					description:'Error! Please specify the number of messages to clear e.g. <clr 10',
					color:0x2471A3
				}});
				return;
			}
			if((clrcommand[1] < 1) || (clrcommand[1] > 99)){
				message.channel.send({embed:{
					description:'You need to enter a number between 1 and 99!',
					color:0x2471A3
				}});
			}
			else{
				if(sender.id === '764170607004745739'){
					var nmb=Number(clrcommand[1])+1;
					message.channel.bulkDelete(nmb);
				}
				else{
					message.channel.send({embed:{
						description:'You do not have permissions to request the deletion of messages on this server!',
						color:0x2471A3
					}});
					return;
				}
			}
		}
	});

	bot.on('ready', function(ready){

		console.log(`Logged in as ${bot.user.tag}!`);
		bot.user.setStatus('Online');
	});

	bot.on('guildMemberAdd', function(member){

		var channel = bot.channels.cache.get('778340125389488169');
		channel.send({embed:{
			description:`Hey ${member}, welcome to **ElJefe Discord Server**! Make sure to read and follow all rules.`,
			color:0x2471A3
		}});
	});

	bot.on('guildMemberRemove', function(member){

		var channel = bot.channels.cache.get('783416981776498748');
		channel.send({embed:{
			description:`User ${member.user.username} left the **ElJefe Discord Server**. We're sorry to see you go :disappointed_relieved:.`,
			color:0x2471A3
		}});
	});

	bot.login(process.env.DISCORD_TOKEN);
