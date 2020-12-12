	/*jshint esversion: 6 */
	//console.log('Step 400');
	module.exports.run = async (bot, message, args, userData) => {
		//console.log('Step 401');
		let fs = require('fs');
		//console.log('Step 402');
		let sender = message.author;
		//console.log('Step 403');
		let input = message.content.toUpperCase();
		//console.log('Step 404');
		let uicommand = input.toString().split(' ');
		//console.log('Step 405');
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
		//console.log('Step 413');
		/*function userInfo(user, guild){
			let finalString = '';
			finalString += '**User Info:**\nUser name: **' + user.username + '**\nUser ID: **' + user.id + '**\n';

			let userCreated = user.createdAt.toString().split(' ');
			finalString += 'Date created **' + userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3] + '**\n';

			finalString += 'Message sent to this server: **' + userData[user.id + guild.id].messagesSent + '** messages';
			return finalString;
		}*/
		if(!uicommand[1]){
			//console.log('Step 414');
			message.channel.send({embed:{
				description:userInfo(sender),
				color:0x2471A3
			}});
			//console.log('Step 415');
		}
		//console.log('Step 416');
		/*if(!uicommand[1]){
			message.channel.send({embed:{
				description:userInfo(sender, message.guild.id),
				color:0x2471A3
			}});
		}*/
		// !!!***JAKO BITNO!!!*** Složiti za ostale usere
	}
	module.exports.config = {
		command:'USERINFO'
	}
