import { Command } from '@blueeast/bluerain-cli-core';
import Debug from 'debug';

const debug = Debug('web-engine-run');

export const run: Command = {
	description: 'Launches Development Server',
	handler: (opts) => {
		debug('here', opts);
	},
	slug: 'run',
};
