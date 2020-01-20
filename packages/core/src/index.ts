declare module 'file-regex';
declare module 'detect-installed';
declare module 'yarn-install';

import * as Utils from './utils';

export { Utils };
export * from './FileManager';

// Init
export { default as init } from './init';
export * from './init/copyTemplateFiles';
export * from './init/dependencies';
