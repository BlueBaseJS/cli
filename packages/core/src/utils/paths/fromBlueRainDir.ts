import path from 'path';

export const fromBlueRainDir = (file: string) => {
	return path.resolve(process.cwd(), 'bluerain', file);
};
