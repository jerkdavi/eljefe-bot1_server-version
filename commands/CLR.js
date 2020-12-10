	/*jshint esversion: 6 */
	//console.log('Step 100');
	module.exports.run = async (bot, message, args, userData) => {
		//console.log('Step 101');
		let sender = message.author;
		//console.log('Step 102');
		let input = message.content.toUpperCase();
		//console.log('Step 103');
		let clrcommand = input.toString().split(' ');
		//console.log('Step 104');
		if(!clrcommand[1]){
			//console.log('Step 105');
			message.channel.send({embed:{
				description:'Error! Please specify the number of messages to clear e.g. <clr 10',
				color:0x2471A3
			}});
			//console.log('Step 106');
			return;
		}
		//console.log('Step 107');
		if((clrcommand[1] < 1) || (clrcommand[1] > 99)){
			//console.log('Step 108');
			message.channel.send({embed:{
				description:'You need to enter a number between 1 and 99!',
				color:0x2471A3
			}});
			//console.log('Step 109');
		}
		//console.log('Step 110');
		else{
			//console.log('Step 111');
			if(sender.id === '764170607004745739'){
				//console.log('Step 112');
				let nmb=Number(clrcommand[1])+1;
				//console.log('Step 113');
				message.channel.bulkDelete(nmb);
				//console.log('Step 114');
			}
			//console.log('Step 115');
			else{
				//console.log('Step 116');
				message.channel.send({embed:{
					description:'You do not have permissions to request the deletion of messages on this server!',
					color:0x2471A3
				}});
				//console.log('Step 117');
				return;
			}
			//console.log('Step 118');
		}
		//console.log('Step 119');
	}
	//console.log('Step 120');
	module.exports.config = {
		command:'CLR'
	}
