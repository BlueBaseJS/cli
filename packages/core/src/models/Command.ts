import { Engine } from "./Engine";

export interface Command {
	/** Slug, used as a key */
	slug: string;

	/** Description */
	description?: string;

	/** Build children commands */
	builder?: object | (() => object);

	/** Main command handler */
	handler: (options: any, engine: Engine) => Promise<void>;
}
