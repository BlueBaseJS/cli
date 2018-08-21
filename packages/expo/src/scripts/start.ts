import { Command } from '@oclif/command';
import path from 'path';
import { spawn } from 'child_process';
import { Utils } from '@blueeast/bluerain-cli-core';

const fromRoot = (pathSegment: string) => path.resolve(__dirname, `../../${pathSegment}`);

export const start = async (ctx: Command): Promise<void> => {

	ctx.log(`Expo start`);

	spawn(
		fromRoot('./node_modules/.bin/expo'),
		['start', '--config', Utils.fromProjectRoot('./build/expo/app.json')],
		{ shell: true, env: process.env, stdio: 'inherit' }
	)
		.on('close', (_code: number) => process.exit(0))
		.on('error', (spawnError: Error) => console.error(spawnError));

	return;
};
