import { EngineRegistry } from './registrys';
import { Engine } from './models/Engine';
import Debug from 'debug';

const debug = Debug('LaunchPad');

type EngineStore = { [key: string]: Engine };

/**
 * This is the main application, that is responsible to do all
 * the heavy lifting from initialing to launching applications.
 */
export class LaunchPad {

	// /** Holds all configurations */
	// public Configs = new ConfigRegistry(this);

	/**
	 * All the engines (platforms, e.g. web, expo, etc) are stored here
	 */
	public Engines = new EngineRegistry(this);

	/**
	 * Load all engines!
	 *
	 * Searches package.json for any packages who's names start
	 * with: "bluerain-cli-engine-"
	 */
	public loadEngines = async (): Promise<EngineStore> => {
		debug('Loading engines!');
		return {};
	}

	/**
	 * Launch an application engine here!
	 */
	public launch = async (
		engineName: string,
		command: string,
		options?: object
	): Promise<void> => {

		debug(`Engine launching: ${engineName} with command ${command}`);

		// =[ System Lifecycle Event ]= Launch Start
		// this.Filters.run('bluerain.cli.launch.start');

		// Deploy the required Engine on LaunchPad
		const engine = (this.Engines.has(engineName))
			? this.Engines.get(engineName)
			: await this.Engines.deploy(engineName);

		// Prepare engine for launce
		// =[ System Lifecycle Event ]= Engine prepared
		await engine.prepare();
		// this.Filters.run('bluerain.cli.engines.prepared', engine);
		debug(`Engine prepared: ${engineName}`);

		// 🚀 Liftoff! 🤘
		await engine.run({ command, options });
	}
}
