import path from 'path';

export const useOwn = (...segments: string[]) => {
	return path.resolve(__dirname, '..', '..', 'node_modules', ...segments);
};