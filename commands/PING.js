module.exports.run = async (bot, message, args) => {
	//if(input === prefix + 'PING'){
		message.channel.send({embed:{
			description:`Ping successful! The bot ${bot.user.tag}! is online!`,
			color:0x2471A3
		}});
	//}
}
module.exports.config = {
	commands: "PING"
}
