import path from 'path';

export default (...segments: string[]) => {
	return path.resolve(__dirname, '..', '..', 'node_modules', ...segments);
};