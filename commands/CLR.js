	/*jshint esversion: 6 */
	//console.log('Step 100');
	module.exports.run = async (bot, message, args, userData) => {
		//console.log('Step 101');
		let sender = message.author;
		//console.log('Step 102');
		let prefix = process.env.prefix;
		//console.log('Step 103');
		if(!(sender.id === '764170607004745739')){
			//console.log('Step 104');
			message.channel.send({embed:{
				description:'You do not have permissions to request the deletion of messages on this server!',
				color:0x2471A3
			}});
			//console.log('Step 105');
			return;
		}
		//console.log('Step 106');
		if(!args[1]){
			//console.log('Step 107');
			message.channel.send({embed:{
				description:`The amount of messages must be specified!\nUsage: **${prefix}CLR <amount>**.`,
				color:0x2471A3
			}});
			//console.log('Step 108');
			return;
		}
		//console.log('Step 109');
		if(isNaN(args[1])){
			//console.log('Step 110');
			message.channel.send({embed:{
				description:`The amount has to be a number!\nUsage: **${prefix}CLR <amount>**.`,
				color:0xD4AF37
			}});
			//console.log('Step 111');
			return;
		}
		//console.log('Step 112');
		if((args[1] < 1) || (args[1] > 99)){
			//console.log('Step 113');
			message.channel.send({embed:{
				description:'You need to enter a number between 1 and 99!',
				color:0x2471A3
			}});
			//console.log('Step 114');
			return;
		}
		//console.log('Step 115');
		let nmb=Number(args[1])+1;
		//console.log('Step 116');
		message.channel.bulkDelete(nmb);
		//console.log('Step 117');
	}
	//console.log('Step 118');
	module.exports.config = {
		command:'CLR'
	}
