const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const { spawn } = require('child_process');

const buildPlugin = function({ buildDirName = 'dist', lookUpDir = 'src', bundleFileName = 'build.js'  } = {}) {
	const obj = {};
	function _initPath() {
		obj.tscCli = path.resolve(__dirname, '../../node_modules/.bin/tsc');
		obj.babelCliPath = path.resolve(__dirname, '../../node_modules/.bin/babel');
		obj.babelRcPath = path.resolve(__dirname, '../plugin/.babelrc');
		// targetPath
		obj.targetRootPath = path.resolve(path.join(process.cwd()));
		obj.tsCompiledDirectory = path.resolve(path.join(process.cwd(), 'compiled'));
		obj.targetOutputPath = path.resolve(path.join(obj.targetRootPath, buildDirName));
		obj.targetLookUpSrcPath = path.resolve(path.join(obj.targetRootPath, lookUpDir));
		obj.targetBabelRcPath = path.join(obj.targetRootPath, '.babelrc');
	}

	_initPath();

	function cleanAndMakeDir() {
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
	    fs.writeFileSync(obj.targetBabelRcPath, JSON.stringify({ 'extends': obj.babelRcPath }));
	}

	function _generateBabelCommand(targetBabelRcExist) {
		const command = `${obj.tscCli} --p ${obj.targetRootPath} && 
						 ${obj.babelCliPath} -D ${obj.tsCompiledDirectory} -o ${obj.targetOutputPath}/${bundleFileName} &&
						 rm -rf ${obj.tsCompiledDirectory}`;
		if (!targetBabelRcExist) {
			_createAndExtendBabelRc();
		}
		return command;
	}

	function executeBabelBuildCommand() {
		const command = _generateBabelCommand(fs.existsSync(obj.targetBabelRcPath));
		spawn(command, { shell: true, stdio: 'inherit' });
	}

	return {
		cleanAndMakeDir,
		executeBabelBuildCommand
	};

};

module.exports = buildPlugin;
