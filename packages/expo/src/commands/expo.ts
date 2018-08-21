import { Command } from '@oclif/command';
import { build, start } from '../internal/scripts';

export default class Expo extends Command {
	static description = 'describe the command here';

	static examples = [
		`$ oclif-example hello
    hello world from ./src/hello.ts!
    `,
	];

	static args = [{
		default: 'start',              // default value if no arg input
		name: 'action',                  // name of arg to show in help and reference with args[name]
		options: ['build', 'start'],           // only allow input to be from a discrete set
		required: true,               // make the arg required with `required: true`
    // description: 'The action to perform ', // help description
    // hidden: true,                  // hide this arg from help
    // parse: input => 'output',      // instead of the user input, return a different value
	}];

	async run() {
		const { args } = this.parse(Expo);

		console.log('Expo', args);
		if (args.action === 'build') {
			await build(this);
		} else if (args.action === 'start') {
			await start(this);
		}
	}
}
