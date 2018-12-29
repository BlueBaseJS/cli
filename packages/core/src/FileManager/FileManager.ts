import { Command } from '@oclif/config';
import { ConfigFileInfo } from './ConfigFileInfo';
import { HookRegistry } from './bluebase/HookRegistry';
import { Registry } from './bluebase/Registry';
import { Utils } from '..';
import findFiles from 'file-regex';
import { isFunction } from 'util';
import path from 'path';

export interface BRCommand extends Command {
	configFiles: ConfigFileInfo[];
	fileManager: FileManager;
}

export type FileInfo = { dir: string, file: string };

const logger = Utils.logger;

/**
 * Manage configuration files during build time
 * i.e. Web, Electron, Expo, etc
 */
export class FileManager extends Registry<ConfigFileInfo> {

	public Logger: any = Utils.logger;

	//////// Registrys ////////

	/** Hooks for hook mechanism */
	public Hooks = new HookRegistry(this as any);

	/**
	 * The file pattern to used to find BlueBase Engine repos in
	 * package.json.
	 */
	// private engineRepoPrefix: string = 'bluebase-cli-engine-';
	private pluginRepoPrefix: string = '^bluebase-(platform|plugin|app)-.+$';

	constructor(private slug: string, private configFiles?: ConfigFileInfo[]) {
		super({ Logger: logger });
	}

	/**
	 * Does the following:
	 * - Registers all hooks from various files across project.
	 * - Loads all command specific configs from platform.js
	 */
	public async setup() {
		this.Logger.debug(`Preparing FileManager`);

		if (!this.configFiles) {
			return;
		}

		// Search relevant files (& hooks) as required
		// by this FileManager.
		this.Logger.debug(`Adding ${this.configFiles.length} config file definitions.`);
		this.addMany(this.configFiles);

		// Load the relevant hooks as required by this Command from different files.
		await this.registerHooks();

		return this;
	}

	/**
	 * Bulk add files
	 */
	public addMany = (configFiles: ConfigFileInfo[] = []) => {
		configFiles.forEach(cfile => this.set(cfile.slug, cfile));
	}

	/** Query all files that provide hooks, and register them */
	public registerHooks = async (): Promise<void> => {
		const fileInfoObjects = [...this.data.values()];
		logger.debug(`Registering hooks`);

		for (const fileInfo of fileInfoObjects) {

			// Skip for all files that are not hooks or are directories
			if (!fileInfo.isHook || fileInfo.isDir) {
				continue;
			}

			logger.debug(`Registering hooks for ${fileInfo.slug} file.`);

			// General hook name
			//
			// Examples:
			// configs hook: web.configs
			// webpack hook: web.webpack
			const hookName = `${this.slug}.${fileInfo.slug}`;

			// Resolve all paths that have the relevant hook files
			const hookFiles = await this.resolveAllPaths(fileInfo);

			// Import each file and add to Filter registry
			for (const hookFile of hookFiles) {
				let hook = await import(hookFile);

				// ES modules
				hook = hook.default ? hook.default : hook;

				// Check function
				if (!isFunction(hook)) {
					throw Error(`Registered hook is not a function in ${hookFile}`);
				}

				this.Hooks.tap(hookName, hookFile, hook);
			}
		}

	}

	/**
	 * Resolves all look up paths, including default, and plugin paths
	 */
	public resolveAllPaths = async (file: ConfigFileInfo): Promise<string[]> => {

		const paths: string[] = [];

		// Default Path
		const defaultPath = await this.resolveDefaultPath(file.slug);
		paths.push(defaultPath);

		// Plugins
		if (file.findInPlugins === true) {
			const plugins = await this.listBlueBasePlugins();

			// Find all plugins that have this file
			for (const plugin of plugins) {
				const dir = Utils.fromProjectRoot(`node_modules/${plugin}/bluebase`);
				const files = await this.find(dir, file.name);
				files.map(f => paths.push(path.resolve(f.dir, f.file)));
			}
		}

		// BlueBase Dir
		if (file.findInBlueBase === true) {
			try {
				const brFilePath = await this.resolveFilePath(file.slug);
				paths.push(brFilePath);
			// tslint:disable-next-line:no-empty
			} catch (error) {}
		}

		return paths;
	}

	/**
	 * Resolves path of file, if it doesn't exist, returns default path
	 *
	 * Example: resolveWithFallback('boot');
	 */
	public resolveWithFallback = async (slug: string): Promise<string> => {

		if (!this.has(slug)) {
			throw Error(`No file registered by the slug "${slug}", did you forget to add it?`);
		}

		try {
			const result = await this.resolveFilePath(slug);
			return result;
		} catch (error) {
			return this.resolveDefaultPath(slug);
		}
	}

	/**
	 * Resolves path of default file
	 */
	public resolveDefaultPath = async (slug: string): Promise<string> => {
		const info = this.get(slug);

		if (!info) {
			throw Error('Config file object not found!');
		}

		return info.defaultPath;
	}

	/**
	 * Resolve path of the file
	 */
	public resolveFilePath = async (slug: string): Promise<string> => {
		const info = this.get(slug);

		if (!info) {
			throw Error('Config file object not found!');
		}

		const result = await this.find(info.dir, info.name);

		if (!result || result.length === 0) {
			throw Error(`File ${slug} not found in ${info.dir}`);
		}

		return path.resolve(info.dir, result[0].file);
	}

	/**
	 * Find all files in the given directory that match the pattern.
	 */
	public find = async (dir: string, pattern: string): Promise<FileInfo[]> => {
		return new Promise((resolve, reject) => {

			findFiles(dir, pattern, (err: Error, files: FileInfo[]) => {
				if (err !== null) { return reject(err); }
				resolve(files);
			});
		}) as Promise<FileInfo[]>;
	}

	/**
	 * Check if a file exists
	 */
	public exists = async (slug: string): Promise<boolean> => {
		try {
			const result = await this.resolveFilePath(slug);
			return result ? true : false;
		} catch (error) {
			return false;
		}
	}


	/**
	 * Get a list of all installed bluebase app, plugins or platforms.
	 * Does so by looking in the project's package.json.
	 * If NODE_ENV === 'production', looks only in dependencies,
	 * otherwise filters devDependencies as well.
	 */
	private listBlueBasePlugins = async (): Promise<string[]> => {

		// We can't gauranttee availability of platform configs here
		const isDev = !Utils.isProduction();

		// Load package.json
		const Package = await import(Utils.fromProjectRoot('package.json'));

		// Load dependencies
		const dependencies = isDev
			? { ...Package.devDependencies, ...Package.dependencies }
			: Package.dependencies;

		// Filter based on regex
		const plugins = Object.keys(dependencies).filter(name => {
			return new RegExp(this.pluginRepoPrefix).test(name);
		});

		return plugins;
	}
}
