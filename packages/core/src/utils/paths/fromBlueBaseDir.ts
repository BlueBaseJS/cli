import path from 'path';

export const fromBlueBaseDir = (file: string) => {
	return path.resolve(process.cwd(), 'bluebase', file);
};
