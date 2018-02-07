const inquirer = require('inquirer');

const nameWizard = function(name) {
	const namePrompt = [
		{
			type: 'input',
			name: 'name',
			message: `Name of your ${name}?`
		}
	];
	return new Promise((resolve, reject) => {
		inquirer.prompt(namePrompt)
			.then((answers) => {
				resolve(answers.name);
			});
	});
};

module.exports = nameWizard;
