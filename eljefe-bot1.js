	/*jshint esversion: 6 */
	//console.log('Step 000');
	let Discord = require('discord.js');
	//console.log('Step 001');
	let bot = new Discord.Client();
	//console.log('Step 002');
	let fs = require('fs');
	//console.log('Step 003');
	let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
	//console.log('Step 004');
	let profanities = JSON.parse(fs.readFileSync('Storage/profanities.json', 'utf8'));
	//console.log('Step 005');
	let profanities2 = JSON.parse(fs.readFileSync('Storage/profanities2.json', 'utf8'));
	//console.log('Step 006');
	bot.commands = new Discord.Collection();
	//console.log('Step 007');
	fs.readdir('./commands/', (err, files) => {
		//console.log('Step 008');
		if(err){
			//console.log('Step 009');
			console.error(err);
		}
		//console.log('Step 010');
		let jsfiles = files.filter(f => f.split('.').pop() === 'js');
		//console.log('Step 011');
		if(jsfiles.length <= 0) { return /*console.log('Step 012'); */console.log('No commands found!'); }
		else { /*console.log('Step 013'); */console.log(jsfiles.length + ' commands found!'); }
		//console.log('Step 014');
		jsfiles.forEach((f, i) => {
			//console.log('Step 015');
			delete require.cache[require.resolve(`./commands/${f}`)];
			//console.log('Step 016');
			let cmds = require(`./commands/${f}`);
			//console.log('Step 017');
			console.log(`Command ${f} loading...`);
			//console.log('Step 018');
			bot.commands.set(cmds.config.command, cmds);
			//console.log('Step 019');
		});	
		//console.log('Step 020');
	});
	//console.log('Step 021');
	let prefix = process.env.prefix;
	//console.log('Step 022');
	let owner = process.env.ownerID;
	//console.log('Step 023');
	let swearword;
	//console.log('Step 024');
	bot.on('message', function(message){
		//console.log('Step 025');
		let sender = message.author;
		//console.log('Step 026');
		if((sender.id === '781250071215472640') || (sender.id === '781277535232458763')){
			//console.log('Step 027');
			return;
		}
		//console.log('Step 028');
		if(!userData[sender.id]){
			//console.log('Step 029');
			userData[sender.id] = {
			messagesSent: 0 };
			//console.log('Step 030');
		}
		//console.log('Step 031');
		userData[sender.id].messagesSent++;
		//console.log('Step 032');
		/*if(!userData[sender.id + message.guild.id]){
			userData[sender.id + message.guild.id] = {
			messagesSent: 0 };
		}*/
		/*userData[sender.id + message.guild.id].messagesSent++;*/
		fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
			//console.log('Step 033');
			if(err){
				//console.log('Step 034');
				console.error(err);
			}
			//console.log('Step 035');
		});
		//console.log('Step 036');
		if(!profanities2[sender.id]){
			//console.log('Step 037');
			profanities2[sender.id] = {
				swearwords: 0 };
				//console.log('Step 038');
		}
		//console.log('Step 039');
		for(let x = 0; x < profanities.length; x++){
			//console.log('Step 040');
			swearword = profanities[x].toUpperCase();
			//console.log('Step 041');
				if(message.content.toUpperCase().includes(swearword)){
				//console.log('Step 042');
				profanities2[sender.id].swearwords++;
				//console.log('Step 043');
				fs.writeFile('Storage/profanities2.json', JSON.stringify(profanities2), (err) => {
					//console.log('Step 044');
					if(err){
						//console.log('Step 045');
						console.error(err);
					}
					//console.log('Step 046');
				});
				//console.log('Step 047');
				message.delete();
				//console.log('Step 048');
				sender.send({embed:{
					description:'Hey! Word **' + swearword + '** is not allowed on our server. Please don\'t use it!',
					color:0x2471A3
				}});
				//console.log('Step 049');
				return;
			}
			//console.log('Step 050');
		}
		//console.log('Step 051');
		if(message.content.startsWith(prefix)){
			//console.log('Step 052');
			let args = message.content.toString().split(' ');
			//console.log('Step 053');
			let input = args[0].toUpperCase();
			//console.log('Step 054');
			let cont = input.slice(prefix.length).split(' ');
			//console.log('Step 055');
			let cmd = bot.commands.get(cont[0]);
			//console.log('Step 056');
			if(cmd) {
				//console.log('Step 057');
				cmd.run(bot, message, args, userData);
				//console.log('Step 058');
			}
			//console.log('Step 059');
			else{
				//console.log('Step 060');
				return;
			}
			//console.log('Step 061');
		}
		//console.log('Step 062');
		else{
			//console.log('Step 063');
			return;
		}
		//console.log('Step 064');
	});
	//console.log('Step 065');
	bot.on('ready', function(ready){
		//console.log('Step 066');
		console.log(`Logged in as ${bot.user.tag}!`);
		//console.log('Step 067');
		bot.user.setStatus('Online');
		//console.log('Step 068');
	});
	//console.log('Step 069');
	bot.on('guildMemberAdd', function(member){
		//console.log('Step 070');
		let channel = bot.channels.cache.get('778340125389488169');
		//console.log('Step 071');
		channel.send({embed:{
			description:`Hey ${member}, welcome to **ElJefe Discord Server**! Make sure to read and follow all rules.`,
			color:0x2471A3
		}});
		//console.log('Step 072');
	});
	//console.log('Step 073');
	bot.on('guildMemberRemove', function(member){
		//console.log('Step 074');
		let channel = bot.channels.cache.get('783416981776498748');
		//console.log('Step 075');
		channel.send({embed:{
			description:`User ${member.user.username} left the **ElJefe Discord Server**. We're sorry to see you go :disappointed_relieved:.`,
			color:0x2471A3
		}});
		//console.log('Step 076');
	});
	//console.log('Step 077');
	bot.login(process.env.DISCORD_TOKEN);
	//console.log('Step 078');
