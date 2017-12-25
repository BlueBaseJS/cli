exports.command = 'run <type>';
exports.desc = 'Run a BlueRain project';
exports.builder = function(yargs) {
	return yargs.commandDir('run_cmds');
};
exports.handler = function(argv) {};
