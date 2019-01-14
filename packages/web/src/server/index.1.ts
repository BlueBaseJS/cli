import server from './server';
export { server };
import fs from 'fs';
import { Utils } from '@bluebase/cli-core';

const configsPath = Utils.fromProjectRoot('./build/web/server/flags.json');

if (!fs.existsSync(configsPath)) {
	throw new Error(
		`We could not find the "flags.json" file. Please ensure that the server bundle has been built.`,
	);
}

const flags = JSON.parse(fs.readFileSync(configsPath, 'utf8'));

server(flags);