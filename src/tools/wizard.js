const inquirer = require('inquirer');

const actionPrompt = [
	{
		type: 'list',
		name: 'action',
		message: 'What is your desired action?',
		choices: [
			{
				name: 'Initialize',
				value: 'init'
			},
			{
				name: 'Run',
				value: 'run'
			},
			{
				name: 'Build',
				value: 'build'
			}
		]
	}
];

const initializeActionPrompt = [
	{
		type: 'list',
		name: 'type',
		message: 'What do you want to initialzie?',
		choices: [
			{
				name: 'BlueRain App',
				value: 'app'
			},
			{
				name: 'BlueRain Plugin',
				value: 'plugin'
			},
			{
				name: 'BlueRain Project',
				value: 'project'
			}
		]
	}
];

const platformPrompt = [
	{
		type: 'list',
		name: 'type',
		message: 'What is your target platform?',
		choices: [
			{
				name: 'Android',
				value: 'android'
			},
			{
				name: 'Electron',
				value: 'electron'
			},
			{
				name: 'iOS',
				value: 'ios'
			},
			{
				name: 'Web',
				value: 'web'
			}
		]
	}
];

const buildOsPrompt = [
	{
		type: 'list',
		name: 'type',
		message: 'What is your target OS?',
		choices: [
			{
				name: 'Android',
				value: 'android'
			},
			{
				name: 'iOS',
				value: 'ios'
			},
			{
				name: 'Linux',
				value: 'linux'
			},
			{
				name: 'macOS',
				value: 'macos'
			},
			{
				name: 'Web',
				value: 'web'
			},
			{
				name: 'Windows',
				value: 'windows'
			}
		]
	}
];

const wizard = new Promise((resolve, reject) => {

	const response = {};

	inquirer.prompt(actionPrompt)
		.then((answers) => {

			response.action = answers.action;

			switch (response.action) {
			case 'init':
				return inquirer.prompt(initializeActionPrompt);

			case 'run':
				return inquirer.prompt(platformPrompt);

			case 'build':
				return inquirer.prompt(buildOsPrompt);

			default:
				break;
			}

		})
		.then((answers) => {
			response.type = answers.type;
			resolve(response);
		});
});

module.exports = wizard;
