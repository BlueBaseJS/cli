// import Debug from 'debug';
// import { LaunchPad } from '../launchpad/LaunchPad';
// import WebEngine from './WebEngine';

// const debug = Debug('web-engine-test');

// async function execute(cmd: string) {
// 	const lp = new LaunchPad();
// 	const engine = new WebEngine(lp);
// 	lp.Engines.add('web', engine);

// 	// await engine.prepare();
// 	try {
// 		await lp.launch('web', cmd); // launch server in develop
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// execute('run').then(() => {
// 	debug('Done!');
// });
