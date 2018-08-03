export interface Command {
	/** Slug, used as a key */
	slug: string;

	/** Description */
	description: string;

	/** Build children commands */
	builder: object | (() => object);

	/** Main command handler */
	handler: (argv: any) => Promise<void>;
}
