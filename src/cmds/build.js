exports.command = 'build <type>';
exports.desc = 'Build a BlueRain project';
exports.builder = function(yargs) {
	return yargs.commandDir('build_cmds');
};
exports.handler = function(argv) {};
