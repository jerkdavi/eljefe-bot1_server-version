	/*jshint esversion: 6 */

	var fs = require('fs');
	var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
	var sender = message.author;

	function userInfo(user){
		var finalString = '';
		finalString += '**User Info:**\nUser name: **' + user.username + '**\nUser ID: **' + user.id + '**\n';

		var userCreated = user.createdAt.toString().split(' ');
		finalString += 'Date created **' + userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3] + '**\n';

		finalString += 'Message sent to this server: **' + userData[user.id].messagesSent + '** messages';
		return finalString;
	}

	module.exports.run = async (bot, message, args) => {
		message.channel.send({embed:{
			description:userInfo(sender),
			color:0x2471A3
		}});
		// !!!***JAKO BITNO!!!*** Složiti za ostale usere
	}
	module.exports.config = {
		command:'USERINFO'
	}
