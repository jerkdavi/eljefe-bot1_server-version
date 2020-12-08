	/*jshint esversion: 6 */

	module.exports.run = async (bot, message, args) => {
		message.channel.send({embed:{
			description:commandsList,
			color:0x2471A3
		}});
	}
	module.exports.config = {
		command:'HELP' || 'COMMANDS'
	}
