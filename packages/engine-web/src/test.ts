import { LaunchPad } from '@blueeast/bluerain-cli-core';
import Debug from 'debug';
import Engine from './index';

const debug = Debug('web-engine-test');

async function execute(cmd: string) {
	const lp = new LaunchPad();
	const engine = new Engine(lp);

	lp.Engines.add('web', engine);

	// await engine.prepare();
	await lp.launch('web', cmd); // launch server in develop
}

execute('run').then(() => {
	debug('response');
});
