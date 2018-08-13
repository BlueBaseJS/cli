import { Utils } from '@blueeast/bluerain-cli-core';
import fs from 'fs';
import server from './server';

const configsPath = Utils.fromProjectRoot('./build/server/configs.json');

if (!fs.existsSync(configsPath)) {
	throw new Error(
		`We could not find the "configs.json" file. Please ensure that the server bundle has been built.`,
	);
}

const configs = JSON.parse(fs.readFileSync(configsPath, 'utf8'));

server(configs);
