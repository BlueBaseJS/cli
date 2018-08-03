import { Command } from './Command';

type CommandStore = { [key: string]: Command };

export class Engine {
	/** Engine name */
	// public readonly name: string;

	/** Slug, used as a key */
	// slug: string;

	/** All commands of this engine */
	private commands: CommandStore = {};

	constructor(public readonly name: string, public readonly slug: string) {
	}

	/**
	 * Add a new command to the engine
	 * @param command
	 */
	public addCommand(command: Command) {
		const slug = command.slug;

		if (!slug) {
			throw Error(`Command has no slug`);
		}

		if (this.commands[slug]) {
			throw Error(`A command with the slug ${slug} already exists`);
		}

		this.commands[slug] = command;
	}

	/**
	 * Remove a command
	 * @param slug
	 */
	public removeCommand(slug: string) {

		if (!this.commands[slug]) {
			throw Error(`A command with the slug ${slug} doesn't exist`);
		}

		delete this.commands[slug];
	}

	/**
	 * Get all commands
	 */
	public getCommands = (): CommandStore => {
		return this.commands;
	}

	public run = async (slug: string, options: object = {}): Promise<void> => {
		if (!this.commands[slug]) {
			throw Error(`A command with the slug ${slug} doesn't exist`);
		}

		return this.commands[slug].handler(options);
	}
}
