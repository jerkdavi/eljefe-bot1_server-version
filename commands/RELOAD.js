	/*jshint esversion: 6 */

	var fs = require('fs');

	module.exports.run = async (bot, message, args) => {
		fs.readdir('', (err, files) => {
			if(err){
				console.error(err);
			}
				
			var jsfiles = files.filter(f => f.split('.').pop() === 'js');
			if(jsfiles.length <= 0) { return console.log('No commands found!'); }
			else { console.log(jsfiles.length + ' commands found!'); }
			
			jsfiles.forEach((f, i) => {
				delete require.cache[require.resolve(`./${f}`)];
				var cmds = require(`./${f}`);
				console.log(`Command ${f} loading...`);
				bot.commands.set(cmds.config.command, cmds);
			});
			
		});
	}
	module.exports.config = {
		command:'RELOAD'
	}
