import notifier from 'node-notifier';
import colors from 'colors/safe';
import { execSync } from 'child_process';
import config from '../config';

export function log(options) {
	const title = `${options.title.toUpperCase()}`;

	if (options.notify) {
		notifier.notify({
			title,
			message: options.message,
		});
	}

	const level = options.level || 'info';
	const msg = `${title}: ${options.message}`;

	switch (level) {
	case 'warn':
		console.log(colors.yellow(msg));
		break;
	case 'error':
		console.log(colors.bgRed.white(msg));
		break;
	case 'special':
		console.log(colors.italic.cyan(msg));
		break;
	case 'info':
	default:
		console.log(colors.green.dim(msg));
	}
}

export function exec(command) {
	execSync(command, { stdio: 'inherit', cwd: config('projectRootDir') });
}
