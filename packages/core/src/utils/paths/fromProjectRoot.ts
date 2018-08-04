import appRootDir from 'app-root-dir';
import path from 'path';

export const fromProjectRoot = (file: string) => {
	return path.resolve(appRootDir.get(), file);
};
