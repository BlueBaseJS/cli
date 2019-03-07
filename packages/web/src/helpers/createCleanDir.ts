import fs from 'fs';
import rimraf from 'rimraf';
import shell from 'shelljs';

/**
 * If the dir exists, deletes it. Then creates a new dir.
 * @param path
 */
export function createCleanDir(path: string) {
	// Delete dir if already exists
	if (fs.existsSync(path)) {
		rimraf.sync(path);
	}

	// Create a new build dir
	shell.mkdir('-p', path);
}
