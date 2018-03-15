import { log } from '../utils';
import config from '../../config';
const gitHubCloner = require('./gitHubCloner');
const name = process.argv.pop();
/**
 * gitHubCloner expect and object of url and project name.
 * By Default project name is 'bluerain-boilerplate'.
 * It return an object having single method executeCommand.
 * executeCommand expect list of commands supported by gitHubCloner
 * you can pass callback, that would be last parameter of gitHubCloner.
 * Supported commands are 'CREATE_DIR', 'CD', 'GIT_CLONE', 'RUN'.
 * If you don't provide any command in executeCommand It will invoke
 * all of the commands.
*/

const stub = gitHubCloner({ url: config('gitPluginUrl'), name, type: 'Plugin' });
stub.executeCommand((msg) => {
	log({
		title: 'Create',
		level: 'info',
		message: msg
	});
});
