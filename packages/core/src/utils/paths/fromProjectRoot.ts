import path from 'path';

export const fromProjectRoot = (...segments: string[]) => {
	return path.resolve(process.cwd(), ...segments);
};
