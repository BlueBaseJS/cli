import { Utils } from '@bluebase/cli-core';
import { findFile } from './findFile';
import path from 'path';

export interface CreateBundleInterface {
	configDir: string,
	name: string,
}

export const getBlueBasePath = async ({ configDir }: CreateBundleInterface) => {

	const bluebaseJsPath = findFile(
    path.resolve(configDir, 'bluebase'),
    Utils.fromCore('templates/common/bluebase.ts')
	);

	return bluebaseJsPath;
};
