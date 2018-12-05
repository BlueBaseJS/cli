import path from 'path';

export const fromCore = (file: string) => {
	return path.resolve(__dirname, '..', '..', '..', file);
};
