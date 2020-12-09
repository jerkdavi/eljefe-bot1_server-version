	/*jshint esversion: 6 */

	var Discord = require('discord.js');
	var bot = new Discord.Client();
	var fs = require('fs');

	var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
	var profanities = JSON.parse(fs.readFileSync('Storage/profanities.json', 'utf8'));
	var profanities2 = JSON.parse(fs.readFileSync('Storage/profanities2.json', 'utf8'));

	bot.commands = new Discord.Collection();

	fs.readdir('./commands/', (err, files) => {
		if(err){
			console.error(err);
		}
				
		var jsfiles = files.filter(f => f.split('.').pop() === 'js');
		if(jsfiles.length <= 0) { return console.log('No commands found!'); }
		else { console.log(jsfiles.length + ' commands found!'); }
			
		jsfiles.forEach((f, i) => {
			delete require.cache[require.resolve(`./commands/${f}`)];
			var cmds = require(`./commands/${f}`);
			console.log(`Command ${f} loading...`);
			bot.commands.set(cmds.config.command, cmds);
		});	
	});

	var prefix = '<';
	var owner = process.env.ownerID;
	var swearword;

	bot.on('message', function(message){
		var sender = message.author;
		var input = message.content.toUpperCase();

		if((sender.id === '781250071215472640') || (sender.id === '781277535232458763')){
			return;
		}

		/*if(!userData[sender.id]){
			userData[sender.id] = {
			messagesSent: 0 };
		}*/
		/*userData[sender.id].messagesSent++;*/

		if(!userData[sender.id + message.guild.id]){
			userData[sender.id + message.guild.id] = {
			messagesSent: 0 };
		}
		userData[sender.id + message.guild.id].messagesSent++;

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

		if(input.startsWith(prefix)){

			var cont = input.slice(prefix.length).split(' ');
			var args = cont.slice(1);
			var cmd = bot.commands.get(cont[0]);

			if(cmd) {
				cmd.run(bot, message, args, userData);
			}
			else{
				console.log('Error! Else passed!');
				return;
			}
		}
		else{
			return;
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

	bot.login('NzgxMjUwMDcxMjE1NDcyNjQw.X7650w.f8jAjAi45DRhLTYztXtWJ08OxPU');
