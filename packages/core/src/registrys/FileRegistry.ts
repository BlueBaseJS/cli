import { ConfigFileInfo } from '../models/ConfigFiles';
import { Engine } from '../models';
import { fromProjectRoot } from '../utils/paths';
import MapRegistry from './MapRegistry';
import findFiles from 'file-regex';
import path from 'path';

export type FileInfo = { dir: string, file: string };

export default class FileRegistry extends MapRegistry<ConfigFileInfo> {

	/**
	 * The file pattern to used to find BlueRain Engine repos in
	 * package.json.
	 */
	// private engineRepoPrefix: string = 'bluerain-cli-engine-';
	private pluginRepoPrefix: string = '^bluerain-(platform|plugin|app)-.+$';

	constructor(private engine: Engine) {
		super('FileRegistry');
	}

	/**
	 * Bulk add files
	 */
	public addMany = (configFiles: ConfigFileInfo[]) => {
		configFiles.forEach(cfile => this.add(cfile.slug, cfile));
	}

	/** Query all files that provide hooks, and register them */
	public registerHooks = async (): Promise<void> => {
		const fileInfoObjects = this.data.toArray();

		for (const fileInfo of fileInfoObjects) {

			// Skip for all files that are not hooks or are directories
			if (!fileInfo.isHook || fileInfo.isDir) {
				return;
			}

			// General hook name
			//
			// Examples:
			// platform hook: engine.web.file.platform
			// webpack hook: engine.web.file.webpack
			const hookName = `engine.${this.engine.slug}.file.${fileInfo.slug}`;

			// Resolve all paths that have the relevant hook files
			const hookFiles = await this.resolveAllPaths(fileInfo);

			// Import each file and add to Filter registry
			for(const hookFile of hookFiles) {
				const hook = await import(hookFile);
				this.engine.LP.Filters.add(hookName, hookFile, hook);
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
			const plugins = await this.listBlueRainPlugins();

			// Find all plugins that have this file
			for (const plugin of plugins) {
				const dir = fromProjectRoot(`node_modules/${plugin}/bluerain`);
				const files = await this.find(dir, file.name);
				files.map(f => paths.push(path.resolve(f.dir, f.file)));
			}
		}

		// BlueRain Dir
		if (file.findInBlueRain === true) {
			const brFilePath = await this.resolveFilePath(file.slug);
			paths.push(brFilePath);
		}

		return paths;
	}

	/**
	 * Resolves path of file, if it doesn't exist, returns default path
	 *
	 * Example: resolveWithFallback('boot');
	 */
	public resolveWithFallback = async (): Promise<string> => {
		try {
			const result = await this.resolveFilePath('boot');
			return result;
		} catch (error) {
			return this.resolveDefaultPath('boot');
		}
	}

	/**
	 * Resolves path of default file
	 */
	public resolveDefaultPath = async (slug: string): Promise<string> => {
		const info = this.get(slug);
		return info.defaultPath;
	}

	/**
	 * Resolve path of the file
	 */
	public resolveFilePath = async (slug: string): Promise<string> => {
		const info = this.get(slug);
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

			findFiles(dir, pattern, (err, files) => {
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
			return (result) ? true : false;
		} catch (error) {
			return false;
		}
	}


	/**
	 * Get a list of all installed bluerain app, plugins or platforms.
	 * Does so by looking in the project's package.json.
	 * If NODE_ENV === 'production', looks only in dependencies,
	 * otherwise filters devDependencies as well.
	 */
	private listBlueRainPlugins = async (): Promise<string[]> => {

		// We can't gauranttee availability of platform configs here
		const isDev = (process.env.NODE_ENV === 'production') ? true : false;

		// Load package.json
		const Package = await import(fromProjectRoot('package.json'));

		// Load dependencies
		const dependencies = (isDev)
			? { ...Package.devDependencies, ...Package.dependencies }
			: Package.dependencies;

		// Filter based on regex
		const plugins = Object.keys(dependencies).filter(name => {
			return new RegExp(this.pluginRepoPrefix).test(name);
		});

		return plugins;
	}
}
