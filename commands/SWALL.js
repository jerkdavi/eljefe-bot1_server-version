	/*jshint esversion: 6 */
	//console.log('Step 300');
	module.exports.run = async (bot, message, args, userData) => {
		let fs = require('fs');
		let sender = message.author;
		let owner = process.env.ownerID;
		if(!(sender.id === owner)){
			message.channel.send({embed:{
				description:'You do not have permissions to request the profanities data of all users on this server!',
				color:0xD4AF37
			}});
			return;
		}
		fs.readFile('Storage/profanities2.json', (err, data) => {
			if(err){ console.error(err); }
			let profanities2all = JSON.stringify(JSON.parse(data), null, 2);
			message.channel.send(profanities2all);
			console.log(profanities2all)
		});
	}
	module.exports.config = {
		command:'SWALL'
	}
