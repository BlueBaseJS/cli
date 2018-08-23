import { ConfigFileInfo } from './ConfigFileInfo';
import { HookRegistry } from '@blueeast/bluerain';
import { FileRegistry } from '.';
import { Command } from '@oclif/config';
import { Utils } from '..';

export interface BRCommand extends Command {
	configFiles: ConfigFileInfo[];
	fileManager: FileManager;
}

/**
 * Manage configuration files during build time
 * i.e. Web, Electron, Expo, etc
 */
export class FileManager {

	/** Configuration files to load */
	public configFiles?: ConfigFileInfo[];

	public Logger: any = Utils.logger;

	//////// Registrys ////////

	/** Holds all configurations */
	public configs: { [key: string]: any } = {};

	/** All files to be loaded and process. */
	public Files = new FileRegistry(this);

	/** Hooks for hook mechanism */
	public Hooks = new HookRegistry(this as any);

	constructor(public command: BRCommand) {}

	/**
	 * Does the following:
	 * - Registers all hooks from various files across project.
	 * - Loads all command specific configs from platform.js
	 */
	public async prepare() {
		this.Logger.info(`Preparing FileManager`);
		
		const slug = this.command.id;
		
		// Search relevant files (& hooks) as required
		// by this FileManager.
		this.Logger.info(`Adding ${this.command.configFiles.length} config file definitions.`)
		this.Files.addMany(this.command.configFiles);

		// Load the relevant hooks as required by this Command from different files.
		await this.Files.registerHooks(this);
		
		// Look up platform configs
		// Hook through all configs.js files
		this.configs = await this.Hooks.run(`${slug}.configs`, {});

		this.Logger.info(`FileManager preperation completed`);

		return this;
	}

}
