import path from 'path';

export default (...segments: string[]) => {
	return path.resolve(__dirname, '..', '..', ...segments);
};