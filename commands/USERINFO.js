	/*jshint esversion: 6 */
	
	var input = message.content.toUpperCase();
	
	module.exports.run = async (bot, message, args) => {
		var uicommand = input.toString().split(' ');
		if(!uicommand[1]){
			message.channel.send({embed:{
				description:userInfo(sender),
				color:0x2471A3
			}});
		}
		// !!!***JAKO BITNO!!!*** Složiti za ostale usere
	}
	module.exports.config = {
		command:'USERINFO'
	}
