	/*jshint esversion: 6 */
	//console.log('Step 400');
	module.exports.run = async (bot, message, args, userData) => {
		//console.log('Step 401');
		let fs = require('fs');
		//console.log('Step 402');
		let sender = message.author;
		//console.log('Step 403');
		function userInfo(user){
			//console.log('Step 406');
			let finalString = '';
			//console.log('Step 407');
			finalString += `**User Info:**\nUser name: **${user.username}**\nUser ID: **${user.id}**\n`;
			//console.log('Step 408');
			let userCreated = user.createdAt.toString().split(' ');
			//console.log('Step 409');
			finalString += `Date created **${userCreated[1]} ${userCreated[2]}, ${userCreated[3]}**\n`;
			//console.log('Step 410');
			finalString += `Message sent to this server: **${userData[user.id].messagesSent}** messages`;
			//console.log('Step 411');
			return finalString;
		}
		//console.log('Step 412');
		let definedUser = '';
		if(!args[1]){
			definedUser = message.author;
			//console.log(`${definedUser}`);
		}
		else{
			let firstMentioned = message.mentions.users.first();
			if(firstMentioned === undefined){
				if(args[2].startsWith('@')){
					message.channel.send({embed:{
						description:`You misspelled the user's name!`,
						color:0xD4AF37
					}});
					return;
				}
				message.channel.send({embed:{
					description:`You didn't use the correct call function e.g. @${args[2]}!`,
					color:0xD4AF37
				}});
				return;
			}
			definedUser = firstMentioned;
			//console.log(`${definedUser}`);
		}
		if(!userEco[definedUser.id]){
			message.channel.send({embed:{
				description:`User ${definedUser} is not inicialized!\nThe user needs to send at least one message to this channel so the bot can initialize her/him!`,
				color:0xD4AF37
			}});
			return;
		}
		//console.log('Step 413');
		message.channel.send({embed:{
			description:userInfo(definedUser),
			color:0x2471A3
		}});
		//console.log('Step 414');
	}
	module.exports.config = {
		command:'USERINFO'
	}
