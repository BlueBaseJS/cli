import { LaunchPad, Utils } from '@blueeast/bluerain-cli-core';
import { WebEngine } from './engine';

const logger = Utils.logger;

async function execute(cmd: string) {
	const lp = new LaunchPad();
	const engine = new WebEngine(lp);
	lp.Engines.add('web', engine);

	// await engine.prepare();
	await lp.launch('web', cmd); // launch server in develop
}

execute('run')
	.then(() => {
		logger.log({
			label: 'BlueRain Engine Web: test command',
			level: 'info',
			message: 'Done!',
		});
	})
	.catch((error) => {
		logger.log({
			error,
			label: 'BlueRain Engine Web: test command',
			level: 'error',
			message: `An error occured while building BlueRain project.`
		});
	});
