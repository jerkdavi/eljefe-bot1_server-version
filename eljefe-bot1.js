	/*jshint esversion: 6 */
	//require('dotenv').config(); // Requiring for modules. Calling the package.

	var Discord = require('discord.js');
	var bot = new Discord.Client();
	var fs = require('fs'); // First, we need to require fs, it is packaged with node.js so no need to download anything extra.
	//var profanities = JSON.parse('Storage/profanities.json'); // We need to require all of our packages after we install them.
	var profanities = JSON.parse(fs.readFileSync('Storage/profanities.json', 'utf8'));
	var profanities2 = JSON.parse(fs.readFileSync('Storage/profanities2.json', 'utf8'));

	// Second, lets call the file we just made using fs.
	var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
	var commandsList = fs.readFileSync('Storage/commands.txt', 'utf8'); // We need to call the file, we can just copy the line above and paste it here. We need to edit it a little.

	// Functions
	function userInfo(user){
		var finalString = ''; // This is the beginning of the final string, but we need to add things to it.
		finalString += '**User Info:**\n';
		
		// Name
		finalString += 'User name: **' + user.username + '**\n';
		finalString += 'User ID: **' + user.id + '**\n'; // This gets the name of the user, and the ID, and adds it to the final string.
		
		// Now, lets add the created At date. This doesn't look good, so lets split it and recreate the createdAt message.
		var userCreated = user.createdAt.toString().split(' ');
		finalString += 'Date created **' + userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3] + '**\n';
		
		// Messags Sent
		if(userData[user.id].messagesSent === 1){
			finalString += 'Message sent to this server: **' + userData[user.id].messagesSent + '** message';}
		else{
			finalString += 'Message sent to this server: **' + userData[user.id].messagesSent + '** messages';}
		return finalString; // This sends what we wrote to the function call down in the script.
	}

	// This will run whenever a message is sent to a server / the bot.
	// Listener Event: Message Received ( This will run every time a message is received ).

	bot.on('message', function(message){

		var sender = message.author; // The person who sent the message.
		var input = message.content.toUpperCase(); // Turns the message to Uppercase, ignoring case sensitivity.
		var prefix = process.env.prefix; // This will be your prefix, you can change it.
		var swearword;
		
		// First, we need to make sure that it isn't reading a message that the bot is sending.
		// Checks if the ID of the sender is the same id as that of the bot.
		if(sender.id === '781250071215472640'){
			return; // Cancels the rest of the Listener Event.
		}

		// When a user type message, with the prefix, it runs this.
		// Remember, it has to be all caps, beacase input is all caps. -- Don't forger the prefix.

		// Help command
		if(input === prefix + 'HELP' || input === prefix + 'COMMANDS'){ // Checks to see if they said help OR commands.
			// Now we have to call the .txt file and display it.
			message.channel.send(commandsList);
		}
		
		if(input === prefix + 'PING'){
			message.channel.send('Ping successful!');
		}

		// Stats sommand - when someone types 'stats', with the prefix, it runs this.
		// Remember, it has to be all caps, beacase input is all caps. -- Don't forger the prefix.
		if(input === prefix + 'STATS'){
			console.log('Entered STATS!');

			//message.channel.send('**Bot Stats**\n\n' + // '\n' means new line, so this will create 2 new lines.
			//'**Users:** ' + bot.users.length + // This grabs how many users the bot is connected to.
			//'**Servers:** ' + bot.servers.length + // This grabs how many servers the bot is connected to.
			//'**Channels:** ' + bot.channels.length // This grabs how many channels the bot is connected to.
			//);

			//if(sender === bot.user){
				//return;
			//}
			//if(message.content === 'servers'){
				//message.channel.send('On ' + bot.guilds.size + ' servers!');
			//}
		}

		// Deleting specific messages ( messages that are not and ID for me ).
		//if(message.channel.id === '778340136260862012'){ // Checks if the message is in the specific channel.
			//if(isNaN(message.content)){ // Checks if the message is not a number. If it's not the following code will run.
				//message.delete(); // This deletes the message.
				//sender.send('Please only post the number, and not any other text in this channel, thank you!'); // This private messages the author that what they posted was invalid.
			//}
		//}

		//if(input.includes('LETTUCE')){ // Checks if the word lettuce is included in the message. // You can also do this for other words, in all of the channels.
		//if(input.includes('JEBEM')){
			//message.delete(); // Deletes the message
			//sender.send('The word **Letuce** is banned, please don\'t use it!'); // This private messages the author that what they posted 
			//sender.send('Riječ **je*em** nije dozvoljena, molim te da ju ne koristiš u **ElJefe Discord Serveru**!');
			//return;
		//}
		
		
		// Now, lets make sure their username is there before writing to the file.
		if(!userData[sender.id]){
			userData[sender.id] = {
				messagesSent: 0 };
		}
		
		// Now, lets increase messagesSent and write to the final file.
		userData[sender.id].messagesSent++; // This adds one to 'messagesSent', under the user.
		
		// To save the file we have to write this:
		fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
			if(err){
				console.error(err);
			} // We just want it to log if the there is an error.
		});
		
		// Now, lets make sure their username is there before writing to the file.
		if(!profanities2[sender.id]){
			profanities2[sender.id] = {
				swearwords: 0 };
		}
		
		// Profanity
		for(x = 0; x < profanities.length; x++){ // This loops every word of the profanities list you downloaded.
			swearword = profanities[x].toUpperCase();
			if(input.includes(swearword)){
				
				// Now, lets increase messagesSent and write to the final file.
				profanities2[sender.id].swearwords++; // This adds one to 'messagesSent', under the user.
				
				// To save the file we have to write this:
				fs.writeFile('Storage/profanities2.json', JSON.stringify(profanities2), (err) => {
					if(err){
						console.error(err);
					} // We just want it to log if the there is an error.
				});
				
				
				message.delete(); // Deletes the message
				sender.send('Hey! Word **' + swearword + '** is not allowed on our server. Please don\'t use it!'); // Tells them that they can't say that.
				return; // Stops the rest of the commands from running after they put profanity in their text.
			}
		}
		
		// Now, calling it is pretty easy.
		//if(input === prefix + 'USERSTATS'){
			//message.channel.send('You have sent **' + userData[sender.id].messagesSent + '** messages!');
		//}
		
		// Lets delete that so we can recreate it using a better command.
		if(input.startsWith(prefix + 'USERINFO')){ // This checks if the message starts with the command, since they will be adding things to the end of it.
			// We should assume that if they are not adding a name to the end of the command, they want info on themselves.
			var uicommand = input.toString().split(' ');
			if(!uicommand[1]){ // Lets test what we have now.
				message.channel.send(userInfo(sender)); // This will return the message about info on themselves. // We should make a function, so we don't have to write it multiple times.
			}
			// !!!***JAKO BITNO!!!*** Složiti za ostale usere
		}
		
		if(input.startsWith(prefix + 'CLR')){
			var clrcommand = input.toString().split(' ');
			if(!clrcommand[1]){
				message.channel.send('Error! Please specify the number of messages to clear e.g. >clear 10');
				return;
			}
			if(sender.id === '764170607004745739'){
				nmb=Number(clrcommand[1])+1;
				message.channel.bulkDelete(nmb);
			}
			
			else{
				message.channel.send('You do not have permissions to request the deletion of messages on this server!');
				return; // Cancels the rest of the Listener Event.
			}
		}
		
	});

	// Listener Event: Bot Launched
	bot.on('ready', function(ready){
	// bot.on('ready', () => { // is the same as: 
		console.log(`Logged in as ${bot.user.tag}!`); // Runs when the bot is launched.
		// You can put any code you want here, it will run when you turn on your bot.
		
		// We will be going over setting 'game playing', 'status' and 'streaming'
		// Status
		bot.user.setStatus('Online'); // Your status goes here. It can be 'Online', 'Idle', 'Invisble' and 'Dnd'.
		// Game & Streaming
		//bot.user.setGame('Hello!'); // You can change the string to whatever you want it to say.
		// To set a stream, add another option like this:
		//bot.user.setGame('Hello!', 'https://twitch.tv/truexpixels'); //It has to be a twitch stream link.
		
	});

	// Listener Evnet: User joining the discord server.
	bot.on('guildMemberAdd', function(member){
		console.log('User ' + member.user.username + ' has joined the server!'); // Sends a message in console that someone joined the discord server.
		//console.log(member.guild.roles) // ***JAKO BITNO!!!***

		// Now, let's add a role when they join. First, we need to get the role we want.
		// This looks for the role in the server (guild), it searches by name, meaning you can change 'User' to the role you want.
		//var role = member.guild.roles.cache.find('name', 'Play by the rules');
		//console.log(role)
		// Secondly, we will add the role.
		//member.addRole(role);

		// Sending a message to a channel when a user join discord.
		// The first part gets the channel, the second sends a message to that channel.
		var channel = bot.channels.cache.get('778340125389488169');
		channel.send(`Hey ${member}, welcome to **ElJefe Discord Server**! Make sure to read and follow all rules.`);
	});

	// Now, let's make it so that when someone leaves, code runs.
	// Listener Event: User leaving the discord server.
	bot.on('guildMemberRemove', function(member){
		// The code can simply be copied from the line you made before.
		console.log('User ' + member.user.username + ' has left the server!');
		var channel = bot.channels.cache.get('783416981776498748');
		channel.send(`User ${member.user.username} left the **ElJefe Discord Server**. We're sorry to see you go :disappointed_relieved:.`);
	});

	bot.login(process.env.DISCORD_TOKEN); // Login
	// Don't let people see your token, people can control your bot, including the servers your bot has admin on. 
	// Remember, it has to be a string, so in quotes.
