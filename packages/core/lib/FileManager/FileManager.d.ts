import { Command } from '@oclif/config';
import { ConfigFileInfo } from './ConfigFileInfo';
import { HookRegistry } from './bluebase/HookRegistry';
import { Registry } from './bluebase/Registry';
export interface BRCommand extends Command {
    configFiles: ConfigFileInfo[];
    fileManager: FileManager;
}
export declare type FileInfo = {
    dir: string;
    file: string;
};
/**
 * Manage configuration files during build time
 * i.e. Web, Electron, Expo, etc
 */
export declare class FileManager extends Registry<ConfigFileInfo> {
    private slug;
    private configFiles?;
    Logger: any;
    /** Hooks for hook mechanism */
    Hooks: HookRegistry<any>;
    /**
     * The file pattern to used to find BlueBase Engine repos in
     * package.json.
     */
    private pluginRepoPrefix;
    constructor(slug: string, configFiles?: ConfigFileInfo[] | undefined);
    /**
     * Does the following:
     * - Registers all hooks from various files across project.
     * - Loads all command specific configs from platform.js
     */
    setup(): Promise<this | undefined>;
    /**
     * Bulk add files
     */
    addMany: (configFiles?: ConfigFileInfo[]) => void;
    /** Query all files that provide hooks, and register them */
    registerHooks: () => Promise<void>;
    /**
     * Resolves all look up paths, including default, and plugin paths
     */
    resolveAllPaths: (file: ConfigFileInfo) => Promise<string[]>;
    /**
     * Resolves path of file, if it doesn't exist, returns default path
     *
     * Example: resolveWithFallback('boot');
     */
    resolveWithFallback: (slug: string) => Promise<string>;
    /**
     * Resolves path of default file
     */
    resolveDefaultPath: (slug: string) => Promise<string>;
    /**
     * Resolve path of the file
     */
    resolveFilePath: (slug: string) => Promise<string>;
    /**
     * Find all files in the given directory that match the pattern.
     */
    find: (dir: string, pattern: string) => Promise<FileInfo[]>;
    /**
     * Check if a file exists
     */
    exists: (slug: string) => Promise<boolean>;
    /**
     * Get a list of all installed bluebase app, plugins or platforms.
     * Does so by looking in the project's package.json.
     * If NODE_ENV === 'production', looks only in dependencies,
     * otherwise filters devDependencies as well.
     */
    private listBlueBasePlugins;
}
