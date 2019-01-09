import path from 'path';

export const fromRoot = (...segments: string[]) => {
	return path.resolve(__dirname, '..', '..', ...segments);
};