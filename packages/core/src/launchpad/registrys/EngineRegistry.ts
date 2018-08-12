import { Engine } from '../models';
import { LaunchPad } from '../LaunchPad';
import Debug from 'debug';
import MapRegistry from './MapRegistry';
import { fromProjectRoot, logger } from '../../utils';

const debug = Debug('EngineRegistry');

export default class EngineRegistry extends MapRegistry<Engine> {

	/**
	 * The file pattern to used to find BlueRain Engine repos in
	 * package.json.
	 */
	public static engineRepoPrefix: string = '@blueeast/bluerain-cli-engine-';

	constructor(private LP: LaunchPad) {
		super('EngineRegistry');
	}

	/**
	 * Load all engines!
	 *
	 * Searches package.json for any packages who's names start
	 * with: "bluerain-cli-engine-"
	 */
	public loadEngines = async (): Promise<void> => {

		const packages = await this.listEnginePackages();

		if(packages.length === 0) {
			logger.log({
				label: 'BlueRain CLI',
				level: 'info',
				message: 'There are no engines installed. Aborting... '
			});
		}

		for (const pkg of packages) {
			await this.deploy(pkg);
		}

		logger.log({
			label: 'BlueRain CLI',
			level: 'info',
			message: `Successfully deployed ${packages.length} engines.`
		});

		return;
	}

	/**
	 * Import Engine's npm package and add it to the registry
	 */
	public deploy = async (slug: string): Promise<Engine> => {

		const repoName = (slug.startsWith(EngineRegistry.engineRepoPrefix))
			? slug
			: `${EngineRegistry.engineRepoPrefix}${slug}`;

		debug(`Deploying engine "${slug}" from repo ${repoName}`);
		const EngineModule = require(repoName);

		// Is ES Module?
		const EngineClass = EngineModule.default ? EngineModule.default : EngineModule;
		console.log('EngineClass', EngineClass);
		const engine = new EngineClass(this.LP);
		engine.slug = slug;
		this.add(slug, engine);

		engine.Filters.run('bluerain.cli.engines.deployed', engine);
		debug(`Engine deployed: ${slug}`);

		return engine;
	}

	/**
	 * Searches package.json for any packages who's names start
	 * with: "bluerain-cli-engine-"
	 */
	private listEnginePackages = async (): Promise<string[]> => {

		// Load package.json
		const Package = await import(fromProjectRoot('package.json'));

		// Load dependencies
		const dependencies = { ...Package.devDependencies, ...Package.dependencies };

		// Filter based on regex
		const plugins = Object.keys(dependencies).filter(name => {
			return name.startsWith(EngineRegistry.engineRepoPrefix);
		});

		return plugins;
	}
}
