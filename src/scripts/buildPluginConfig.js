const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const { spawn } = require('child_process');
let childProcess = {};

const buildPlugin = function({ buildDirName = 'dist', lookUpDir = 'src', bundleFileName = 'build.js'  } = {}) {
	const obj = {};
	let isBableRcCreatedByCli = false;
	function _initPath() {
		// CliPath
		obj.tscCli = 'node_modules/.bin/tsc';
		obj.babelCliPath = 'node_modules/.bin/babel';
		// obj.babelRcPath = path.resolve(__dirname, '../plugin/.babelrc');
		obj.babelRcPath = '@blueeast/bluerain-cli/src/plugin/.babelrc';
		// targetPath (External Project)
		obj.targetRootPath = path.resolve(path.join(process.cwd()));
		obj.tsCompiledDirectory = path.resolve(path.join(process.cwd(), 'compiled'));
		obj.targetOutputPath = path.resolve(path.join(obj.targetRootPath, buildDirName));
		obj.targetLookUpSrcPath = path.resolve(path.join(obj.targetRootPath, lookUpDir));
		obj.targetBabelRcPath = path.join(obj.targetRootPath, '.babelrc');
	}

	// Decorate obj variable
	_initPath();

	function _cleanAndMakeDir() {
		// if outPutDirectory does not exist, make new one else remove it first.
		// Then make new one
		if (!fs.existsSync(obj.targetRootPath, buildDirName)) {
			shell.mkdir('-p', buildDirName);
		} else {
			shell.rm('-rf', buildDirName);
			shell.mkdir('-p', buildDirName);
		}
	}

	function _createAndExtendBabelRc() {
		// create empty Babelrc
		shell.touch(obj.targetBabelRcPath);
		// write data
		// eslint rule disable due to extends keyword, because bablerc file expect
		// extend keyword in single/double quote.
		// eslint-disable-next-line
		fs.writeFileSync(obj.targetBabelRcPath, JSON.stringify({ 'extends': obj.babelRcPath }));
		isBableRcCreatedByCli = true;
	}

	function _generateCommand(targetBabelRcExist) {
		// creating command of tsc cli and then run babel cli on output of tsc
		// created directory
		// !!! DON'T BREAK THIS COMMAND IN MULTILINE. !!!
		// const command = `${obj.tscCli} --p ${obj.targetRootPath} && ${obj.babelCliPath} -D ${obj.tsCompiledDirectory} -o ${obj.targetOutputPath}/${bundleFileName} && rm -rf ${obj.tsCompiledDirectory}`;
		const command = `${obj.tscCli} --p ${obj.targetRootPath} && ${obj.babelCliPath} -D ${obj.tsCompiledDirectory} -d ${buildDirName} && rm -rf ${obj.tsCompiledDirectory}`;
		if (!targetBabelRcExist) {
			_createAndExtendBabelRc();

		}
		return command;
	}

	function executeBuildCommand() {
		_cleanAndMakeDir();
		const command = _generateCommand(fs.existsSync(obj.targetBabelRcPath));
		if (isBableRcCreatedByCli) {
			childProcess = spawn(`${command} && rimraf ${obj.targetBabelRcPath}`, { shell: true, stdio: 'inherit' });
		} else {
			childProcess = spawn(command, { shell: true, stdio: 'inherit' });
		}

		childProcess.on('exit', (code, signal) => {
			if (code !== 0) {
				process.exit(code);
			}
		});
	}

	// Expose method to consumer of this function.
	return {
		executeBuildCommand
	};

};

module.exports = buildPlugin;
