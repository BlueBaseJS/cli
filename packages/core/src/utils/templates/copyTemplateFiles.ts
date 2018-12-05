import { copyAll } from '../shell';
import fs from 'fs';
import path from 'path';
import template from 'lodash.template';

export interface TemplateOptions {
	force?: boolean,

	/** Do we prompt to override files? */
	prompt?: boolean,

	/**
	 * List of files to write variables to files.
	 * Each item is a relative path from dest.
	 */
	writeFiles?: string[],

	/**
	 * Variables to write.
	 */
	variables?: { [key: string ]: string }
}

/**
 * Copies files from src to dest. Injects variable in writable files.
 * @param src Path to template src
 * @param dest Path to template dest
 * @param opts Options
 */
export const copyTemplateFiles = async (src: string, dest: string, opts?: TemplateOptions): Promise<void> => {

	const { force, prompt, writeFiles, variables }: TemplateOptions = {
		force: false,
		prompt: true,
		variables: {},
		writeFiles: [],
		...opts
	};

	await copyAll(src, dest, prompt, force);

	writeFiles.forEach(file => {

		const filePath = path.join(dest, file);

		// Inject bluerain.js path in template
		const fileContent = fs.readFileSync(filePath).toString();

		// Template
		const inject = template(fileContent);
		const compiled = inject(variables);

		// Save file
		fs.writeFileSync(filePath, compiled);
	});

	return;
};