	/*jshint esversion: 6 */
	//console.log('Step 300');
	module.exports.run = async (bot, message, args, userData) => {
		let fs = require('fs');
		let sender = message.author;
		let owner = process.env.ownerID;
		if(!(sender.id === '764170607004745739')){
		//if(!(sender.id === owner)){
			message.channel.send({embed:{
				description:'You do not have permissions to request the userdata of all users on this server!',
				color:0xD4AF37
			}});
			return;
		}
		fs.readFile('Storage/userData.json', (err, data) => {
			if(err){ console.error(err); }
			let userDataall = JSON.stringify(JSON.parse(data), null, 2);
			message.channel.send(userDataall);
			console.log(userDataall)
		});
	}
	module.exports.config = {
		command:'UIALL'
	}
