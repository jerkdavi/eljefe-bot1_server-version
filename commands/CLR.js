	/*jshint esversion: 6 */

	module.exports.run = async (bot, message, args) => {
		var input = message.content.toUpperCase();

		var uicommand = input.toString().split(' ');
		if(!uicommand[1]){
			var clrcommand = input.toString().split(' ');
			if(!clrcommand[1]){
				message.channel.send({embed:{
					description:'Error! Please specify the number of messages to clear e.g. <clr 10',
					color:0x2471A3
				}});
				return;
			}
			if((clrcommand[1] < 1) || (clrcommand[1] > 99)){
				message.channel.send({embed:{
					description:'You need to enter a number between 1 and 99!',
					color:0x2471A3
				}});
			}
			else{
				if(sender.id === '764170607004745739'){
					var nmb=Number(clrcommand[1])+1;
					message.channel.bulkDelete(nmb);
				}
				else{
					message.channel.send({embed:{
						description:'You do not have permissions to request the deletion of messages on this server!',
						color:0x2471A3
					}});
					return;
				}
			}
		}
	}
	module.exports.config = {
		command:'CLR'
	}
