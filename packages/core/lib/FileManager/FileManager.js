"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HookRegistry_1 = require("./bluebase/HookRegistry");
const Registry_1 = require("./bluebase/Registry");
const __1 = require("..");
const util_1 = require("util");
const file_regex_1 = __importDefault(require("file-regex"));
const path_1 = __importDefault(require("path"));
const logger = __1.Utils.logger;
/**
 * Manage configuration files during build time
 * i.e. Web, Electron, Expo, etc
 */
class FileManager extends Registry_1.Registry {
    constructor(slug, configFiles) {
        super({ Logger: logger });
        this.slug = slug;
        this.configFiles = configFiles;
        this.Logger = __1.Utils.logger;
        //////// Registrys ////////
        /** Hooks for hook mechanism */
        this.Hooks = new HookRegistry_1.HookRegistry(this);
        /**
         * The file pattern to used to find BlueBase Engine repos in
         * package.json.
         */
        // private engineRepoPrefix: string = 'bluebase-cli-engine-';
        this.pluginRepoPrefix = '^bluebase-(platform|plugin|app)-.+$';
        /**
         * Bulk add files
         */
        this.addMany = (configFiles = []) => {
            configFiles.forEach(cfile => this.set(cfile.slug, cfile));
        };
        /** Query all files that provide hooks, and register them */
        this.registerHooks = () => __awaiter(this, void 0, void 0, function* () {
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
                const hookFiles = yield this.resolveAllPaths(fileInfo);
                // Import each file and add to Filter registry
                for (const hookFile of hookFiles) {
                    let hook = yield Promise.resolve().then(() => __importStar(require(hookFile)));
                    // ES modules
                    hook = hook.default ? hook.default : hook;
                    // Check function
                    if (!util_1.isFunction(hook)) {
                        throw Error(`Registered hook is not a function in ${hookFile}`);
                    }
                    this.Hooks.tap(hookName, hookFile, hook);
                }
            }
        });
        /**
         * Resolves all look up paths, including default, and plugin paths
         */
        this.resolveAllPaths = (file) => __awaiter(this, void 0, void 0, function* () {
            const paths = [];
            // Default Path
            const defaultPath = yield this.resolveDefaultPath(file.slug);
            paths.push(defaultPath);
            // Plugins
            if (file.findInPlugins === true) {
                const plugins = yield this.listBlueBasePlugins();
                // Find all plugins that have this file
                for (const plugin of plugins) {
                    const dir = __1.Utils.fromProjectRoot(`node_modules/${plugin}/bluebase`);
                    const files = yield this.find(dir, file.name);
                    files.map(f => paths.push(path_1.default.resolve(f.dir, f.file)));
                }
            }
            // BlueBase Dir
            if (file.findInBlueBase === true) {
                try {
                    const brFilePath = yield this.resolveFilePath(file.slug);
                    paths.push(brFilePath);
                    // tslint:disable-next-line:no-empty
                }
                catch (error) { }
            }
            return paths;
        });
        /**
         * Resolves path of file, if it doesn't exist, returns default path
         *
         * Example: resolveWithFallback('boot');
         */
        this.resolveWithFallback = (slug) => __awaiter(this, void 0, void 0, function* () {
            if (!this.has(slug)) {
                throw Error(`No file registered by the slug "${slug}", did you forget to add it?`);
            }
            try {
                const result = yield this.resolveFilePath(slug);
                return result;
            }
            catch (error) {
                return this.resolveDefaultPath(slug);
            }
        });
        /**
         * Resolves path of default file
         */
        this.resolveDefaultPath = (slug) => __awaiter(this, void 0, void 0, function* () {
            const info = this.get(slug);
            if (!info) {
                throw Error('Config file object not found!');
            }
            return info.defaultPath;
        });
        /**
         * Resolve path of the file
         */
        this.resolveFilePath = (slug) => __awaiter(this, void 0, void 0, function* () {
            const info = this.get(slug);
            if (!info) {
                throw Error('Config file object not found!');
            }
            const result = yield this.find(info.dir, info.name);
            if (!result || result.length === 0) {
                throw Error(`File ${slug} not found in ${info.dir}`);
            }
            return path_1.default.resolve(info.dir, result[0].file);
        });
        /**
         * Find all files in the given directory that match the pattern.
         */
        this.find = (dir, pattern) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                file_regex_1.default(dir, pattern, (err, files) => {
                    if (err !== null) {
                        return reject(err);
                    }
                    resolve(files);
                });
            });
        });
        /**
         * Check if a file exists
         */
        this.exists = (slug) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.resolveFilePath(slug);
                return result ? true : false;
            }
            catch (error) {
                return false;
            }
        });
        /**
         * Get a list of all installed bluebase app, plugins or platforms.
         * Does so by looking in the project's package.json.
         * If NODE_ENV === 'production', looks only in dependencies,
         * otherwise filters devDependencies as well.
         */
        this.listBlueBasePlugins = () => __awaiter(this, void 0, void 0, function* () {
            // We can't gauranttee availability of platform configs here
            const isDev = !__1.Utils.isProduction();
            // Load package.json
            const Package = yield Promise.resolve().then(() => __importStar(require(__1.Utils.fromProjectRoot('package.json'))));
            // Load dependencies
            const dependencies = isDev
                ? Object.assign({}, Package.devDependencies, Package.dependencies) : Package.dependencies;
            // Filter based on regex
            const plugins = Object.keys(dependencies).filter(name => {
                return new RegExp(this.pluginRepoPrefix).test(name);
            });
            return plugins;
        });
    }
    /**
     * Does the following:
     * - Registers all hooks from various files across project.
     * - Loads all command specific configs from platform.js
     */
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Logger.debug(`Preparing FileManager`);
            if (!this.configFiles) {
                return;
            }
            // Search relevant files (& hooks) as required
            // by this FileManager.
            this.Logger.debug(`Adding ${this.configFiles.length} config file definitions.`);
            this.addMany(this.configFiles);
            // Load the relevant hooks as required by this Command from different files.
            yield this.registerHooks();
            return this;
        });
    }
}
exports.FileManager = FileManager;
//# sourceMappingURL=FileManager.js.map