	/*jshint esversion: 6 */
	
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
