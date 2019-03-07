import { BundleDefinition } from './BundleDefinition';
import { PathsBundle } from '../Flags';

export interface BuilderConfigsProp extends BundleDefinition {
	[key: string]: any;
}

export type BuilderOptions = PathsBundle & {

	/** Platform configs */
	configs: BuilderConfigsProp;
};
