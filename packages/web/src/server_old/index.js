import path from 'path';
import { buildDev } from './core';
import packageJson from '../../package.json';

buildDev({
	packageJson,
	defaultFavIcon: path.resolve(__dirname, 'public/favicon.ico'),
});
