import { ConfigRegistry, FileRegistry, FilterRegistry } from '../registrys';
import { Command } from './Command';
import { ConfigFileInfo } from './ConfigFileInfo';
import { LaunchPad } from '../LaunchPad';
import isnil from 'lodash.isnil';

import Debug from 'debug';
import { hookFn } from '../registrys/FilterRegistry';

const debug = Debug('Engine');

export type CommandStore = { [key: string]: Command };

/**
 * An Engine is an implemetation of an application platform.
 * i.e. Web, Electron, Expo, etc
 */
export class Engine {
	/** Engine name */
	public name?: string;

	/** Slug, used as a key */
	public slug?: string;

	/** Configuration files to load */
	public configFiles?: ConfigFileInfo[];

	/** All commands of this engine */
	public commands?: CommandStore;

	hooks?: { [id: string]: hookFn };

	//////// Registrys ////////

	/** Holds all configurations */
	public Configs = new ConfigRegistry(this);

	/** All files to be loaded and process. */
	public Files = new FileRegistry(this);

	/** Filters for hook mechanism */
	public Filters = new FilterRegistry(this);

	constructor(public LP: LaunchPad) {
	}

	/**
	 * Does the following:
	 * - Registers all hooks from various files across project.
	 * - Loads all engine specific configs from platform.js
	 *
	 * An Engine implementation may extend this to add more functionality
	 */
	public async prepare() {
		debug(`Preparing engine: ${this.slug}`);

		// Search relevant files (& hooks) as required
		// by this engine.
		this.Files.addMany(this.configFiles);

		// Register hooks from the 'hooks' static property of engine
		if (this.hooks) {
			Object.keys(this.hooks).forEach(hook => {
				// Satisfy TS
				if (!this.hooks || !this.hooks[hook]) {
					return;
				}

				this.Filters.set(hook, `${this.slug}.${hook}`, this.hooks[hook]);
			});
		}

		// Load the relevant hook as required by this engine from different files.
		await this.Files.registerHooks();

		// Look up platform configs
		// Run generic hook, so engines can add their defaults here
		const enginePlatform = this.Filters.run('engine.platform', {});
		// Hook through all platform.js files
		const engineConfigs = this.Filters.run('engine.web.file.platform', enginePlatform);

		// Extract engine configs, as platform.js file has configs of all engines
		const slug = this.slug as string;
		let configs = engineConfigs[slug] || {};
		// debug('---configs', configs);

		// =[ System Lifecycle Event ]= Configs Initailzed
		configs = this.Filters.run('bluerain.cli.engine.configs', configs, this);
		this.Configs.registerMany(configs);
	}

	/**
	 * Run a command
	 */
	public run = async (args: { command: string, options?: object }): Promise<void> => {
		if (isnil(this.commands) || isnil(this.commands[args.command])) {
			throw Error(`A command with the slug ${args.command} doesn't exist`);
		}

		return this.commands[args.command].handler(args.options || {}, this);
	}

	// /**
	//  * Add a new command to the engine
	//  * @param command
	//  */
	// public addCommand(command: Command) {
	// 	const slug = command.slug;

	// 	if (!slug) {
	// 		throw Error(`Command has no slug`);
	// 	}

	// 	if (this.commands[slug]) {
	// 		throw Error(`A command with the slug ${slug} already exists`);
	// 	}

	// 	this.commands[slug] = command;
	// }

	// /**
	//  * Remove a command
	//  * @param slug
	//  */
	// public removeCommand(slug: string) {

	// 	if (!this.commands[slug]) {
	// 		throw Error(`A command with the slug ${slug} doesn't exist`);
	// 	}

	// 	delete this.commands[slug];
	// }

	// /**
	//  * Get all commands
	//  */
	// public getCommands = (): CommandStore => {
	// 	return this.commands;
	// }
}
