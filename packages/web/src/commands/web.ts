import { Command, flags } from '@oclif/command';

export default class Hello extends Command {
	static description = 'describe the command here';

	static examples = [
		`$ oclif-example hello
		hello world from ./src/hello.ts!
		`,
	];

	static flags = {
		force: flags.boolean({ char: 'f' }),
		help: flags.help({ char: 'h' }),
		// flag with a value (-n, --name=VALUE)
		name: flags.string({ char: 'n', description: 'name to print' }),
		// flag with no value (-f, --force)
	};

	static args = [{ name: 'file' }];

	async run() {
		const { args, flags: _flags } = this.parse(Hello);

		const name = _flags.name || 'world';
		this.log(`hello ${name} from ./src/commands/hello.ts`);
		if (args.file && _flags.force) {
			this.log(`you input --force and --file: ${args.file}`);
		}
	}
}
