import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
const GitHubCloner = (function() {

	// external path where command will be executed.
	// available this variable because of closure.
	// Closure variables
	const projectPath = path.resolve(process.cwd());
	let gitHubUrl = '';
	let targetDir = '';
	let projectType = '';
	// Supported commands by THIS API
	const commandTypes = {

		CREATE_DIR() {
			return `mkdir -p ${targetDir}`;
		},

		CD() {
			return `cd ${targetDir}`;
		},

		GIT_CLONE() {
			return `git clone ${gitHubUrl} .`;
		},

		RUN() {
			return 'npm install';
		}

	};
	// Collect All keys.
	const commandTypeKeys = Object.keys(commandTypes);
	// Callback fire at the end.
	let fn = {};

	/**
	 * Detect if there is valid git url.
	 * @param {any} str
	 * @returns boolean
	 */
	function _isGitUrl(str) {
		const regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\B#[-\d\w._]+?)$/;
		return regex.test(str);
	}

	function _error(msg) {
		throw new Error(msg);
	}

	/**
	* Error handling of git url
	* @param {string} url
	* @returns Error Object or Boolean
	*/
	function _validateGitUrl(url) {
		return url ?
			(typeof url === 'string' ?
				(_isGitUrl(url) ? true :
					_error('Please provide valid git url.')) :
				_error('Url must be a string.')) :
			_error('Url should\'t be empty.');
	}
	/**
	 * Detect if there is already, same directory
	 * @param {string} dir
	 * @returns Error Object | Boolean
	 */
	function _validateProjectDir(dir) {
		return !fs.existsSync(dir) ? true : _error('Project directory already exist.');
	}

	/**
	 * Generate commands based on arguments.
	 * If no arguments specified it will execute
	 * all commands need to create a project.
	 * If user pass callback it will invoke at the end.
	 * @param {void | Array of string and function} commands
	 * @returns string
	 */
	function _buildCommand(commands) {
		let command = '';
		// If there is no argument or just pass callback.
		if (!commands.length || (commands.length === 1 && typeof commands[commands.length - 1] === 'function')) {
			if (_validateProjectDir(targetDir)) {
				if (commands.length === 1) {
					// get callback
					fn = commands[commands.length - 1];
				}

				for (let i = 0; i < commandTypeKeys.length; i += 1) {
					command += commandTypes[commandTypeKeys[i]]();
					// Append &&
					if (i !== commandTypeKeys.length - 1 ) {
						command += ' && ';
					}
				}
			}
		} else {
			// if there is callback get it, else invoke another commands.
			const len = typeof commands[commands.length - 1] === 'function' ?
				(fn = commands[commands.length - 1], commands.length - 1) :
				commands.length;
			for (let j = 0; j < len; j += 1) {
				if (commands[j] in commandTypes) {
					command += commandTypes[commands[j]]();
					if (j !== len - 1 ) {
						command += ' && ';
					}
				} else {
					_error(`Specified ${commands[j]} command does't supported yet.`);
				}
			}
		}
		return command;
	}

	/**
	 * Expect array of commands and callback as a last arguments.
	 * @param {list of string + Function } commands.
	 * invoke callback after the command is executed.
	 */
	function _exectueCommand(...commands) {
		spawn(_buildCommand(commands), { shell: true, stdio: 'inherit' })
			.on('exit', (code) => {
				if (typeof fn === 'function') {
					fn(`${projectType} created successfully.🌏`);
				}
			});
	}


	return function({ url = '', name = 'bluerain-project', type } = {}) {
		// Cache url and projectName
		gitHubUrl = url;
		targetDir = path.join(projectPath, name);
		projectType = type;
		if (_validateGitUrl(url)) {
			return {
				executeCommand: _exectueCommand,
			};

		}
	};
}());

module.exports =  GitHubCloner;
