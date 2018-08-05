import { LaunchPad } from '@blueeast/bluerain-cli-core';
import { WebEngine } from './engine';
import Debug from 'debug';
const debug = Debug('web-engine-test');
import logger from './logger';

async function execute(cmd: string) {
	const lp = new LaunchPad();
	const engine = new WebEngine(lp);
	lp.Engines.add('web', engine);

	// await engine.prepare();
	try {
		await lp.launch('web', cmd); // launch server in develop
	} catch (error) {
		logger.error(error);
	}
}

execute('run').then(() => {
	debug('Done!');
});
