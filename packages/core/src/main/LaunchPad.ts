import { Engine } from './Engine';
import Debug from 'debug';

const debug = Debug('launchpad');

type EngineStore = { [key: string]: Engine };

export class LaunchPad {
	/**
	 * All the engines are stored here
	 */
	private engines: EngineStore = {};

	/**
	 * The file pattern to used to find BlueRain Engine repos in
	 * package.json.
	 */
	// private engineRepoPrefix: string = 'bluerain-cli-engine-';

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
	 * Get all engines
	 */
	public getEngines = (): EngineStore => {
		return this.engines;
	}

	/**
	 * Launch Engine here!
	 */
	public launch = async (
		engine: string,
		command: string,
		options: object = {}
	): Promise<void> => {

		return this.engines[engine].run(command, options);
	}
}
