import appRootDir from 'app-root-dir';
import path from 'path';

export const fromProjectRoot = (...segments: string[]) => {
	return path.resolve(appRootDir.get(), ...segments);
};
