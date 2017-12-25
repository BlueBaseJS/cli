exports.command = 'init <type>';
exports.desc = 'Initialize a BlueRain repo.';
exports.builder = function(yargs) {
	return yargs.commandDir('init_cmds');
};
exports.handler = function(argv) {};
