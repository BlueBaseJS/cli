import appRootDir from 'app-root-dir';
import path from 'path';

export const fromBlueRainDir = (file: string) => {
	return path.resolve(appRootDir.get(), 'bluerain', file);
};
