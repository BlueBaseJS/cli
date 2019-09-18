/**
 * A ConfigFile is a known file that is used to customize
 * launch or build behaviour of the project.
 *
 * Examples of ConfigFiles are:
 * - boot.js
 * - webpack.config.js
 */
export declare type ConfigFileInfo = {
    /** Human readable ID of this file */
    slug: string;
    /** Path of the default file */
    defaultPath: string;
    /** Find and include from "bluebase" directory of project */
    findInBlueBase: boolean;
    /** Find and include files from bluebase plugins (apps and platforms) */
    findInPlugins: boolean;
    /** Is this a directory. Set true, otherwise false of files. */
    isDir: boolean;
    /** Does this file contain a hook function? */
    isHook: boolean;
    /** File name or pattern */
    name: string;
    /** The directory to look in */
    dir: string;
    /** Custom method to call when all files are resolved */
    handler?: (files: string[]) => void;
};
