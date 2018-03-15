import fs from 'fs';
import JSON5 from 'json5';
import defaultBableConfig from './babel';
import { log } from '../../internal/utils';

export default function customBabelConfigs(appBableRcPath) {
	let customBabelConfig;
	if (fs.existsSync(appBableRcPath)) {
		const content = fs.readFileSync(appBableRcPath, 'utf-8');
		try {
			customBabelConfig = JSON5.parse(content);
			customBabelConfig.babelrc = false;
			log({
				title: 'Babel',
				level: 'info',
				message: 'Loading custom babelrc configs',
			});
		} catch (e) {
			log({
				title: 'Babel',
				level: 'error',
				message: `Error parsing .babelrc file: ${e.message}`,
			});
			throw e;
		}
	}

	if (!customBabelConfig) {
		log({
			title: 'Babel',
			level: 'info',
			message: 'Loading default bablerc configs',
		});
		return defaultBableConfig;
	}

	return customBabelConfig;
}
