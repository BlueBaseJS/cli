import { Engine } from '../models';
import { LaunchPad } from '../LaunchPad';
import Debug from 'debug';
import MapRegistry from './MapRegistry';

const debug = Debug('EngineRegistry');

export default class EngineRegistry extends MapRegistry<Engine> {

	/**
	 * The file pattern to used to find BlueRain Engine repos in
	 * package.json.
	 */
	private engineRepoPrefix: string = '@blueeast/bluerain-cli-engine-';

	constructor(private LP: LaunchPad) {
		super('EngineRegistry');
	}

	/**
	 * Import Engine's npm package and add it to the registry
	 */
	public deploy = async (slug: string): Promise<Engine> => {

		const repoName = `${this.engineRepoPrefix}${slug}`;

		debug(`Deploying engine "${slug}" from repo ${repoName}`);
		const EngineClass = await import(repoName);

		const engine = new EngineClass(this.LP);
		engine.slug = slug;
		this.add(slug, engine);
		return engine;
	}
}
