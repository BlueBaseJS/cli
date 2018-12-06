// tslint:disable:no-bitwise
// tslint:disable:no-var-requires

import { format } from 'winston';

/**
 * A winston formatter that adds random colors based on label.
 * Code taken from 'debug' npm package.
 */
let colors = [6, 2, 3, 4, 5, 1];

try {
	const supportsColor = require('supports-color');
	if (supportsColor && supportsColor.level >= 2) {
		colors = [
			20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
			69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
			135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
			172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
			205, 206, 207, 208, 209, 214, 215, 220, 221
		];
	}
} catch (err) {
	// swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */
function selectColor(namespace: string) {
	let hash = 0, i;

	// tslint:disable-next-line
	for (i in (namespace as any)) {
		// tslint:disable-next-line
		hash = ((hash << 5) - hash) + namespace.charCodeAt(parseInt(i));
		hash |= 0; // Convert to 32bit integer
	}

	return colors[Math.abs(hash) % colors.length];
}

function addColor(name: string) {
	const c = selectColor(name);
	const check = c < 8 ? c : '8;5;' + c;
	const colorCode = '\u001b[3' + check;
	return `${colorCode};1m${name}\u001b[0m`;
}

// Ignore log messages if they have { private: true }
export const addColorToLabel = format((info: any) => {
	return !info.label ? info : {
		...info,
		label: addColor(info.label)
	};
}) as any;
