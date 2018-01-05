exports.command = 'create <type>';
exports.desc = 'Create a BlueRain repo.';
exports.builder = function(yargs) {
	return yargs.commandDir('create_cmds');
};
exports.handler = function(argv) {};
