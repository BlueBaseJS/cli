import fs from 'fs';
import inquirer from 'inquirer';
import shell from 'shelljs';

/**
 * Copies a directory from source to destination. If folder already exists,
 * asks for confirmation to overwrite.
 * @param src
 * @param dest
 */
export const copyAll = async (src: string, dest: string, force: boolean = false) => {

	// If dest folder already exists, ask for overwrite confirmation
	if (fs.existsSync(dest) && !force) {



		// Prompt
		const answers: any = await inquirer.prompt([
			{
				default: false,
				message: `A directory already exists at ${dest}. Do you want to overwrite?`,
				name: 'overwrite',
				type: 'confirm',
				// prefix: '@bluerain/cli/expo'
			}
		]);

		if (!answers.overwrite === true) {
			return;
		}

	} else {

		// Create nested dirs
		shell.mkdir('-p', dest);
	}

	shell.cp('-rf', src + '/*', dest);
};