import { Utils } from '@bluebase/cli-core';
import { FlagDefs, Flags } from '../../cli-flags';
import { Command } from '@oclif/command';
import { run } from '../../helpers';

export class StartStaticCommand extends Command {

	static flags = FlagDefs;

	async run() {

		const parsed = this.parse(StartStaticCommand);
		const flags = parsed.flags as Flags;

		Utils.logger.log({
			label: '@bluebase/cli/web-static',
			level: 'info',
			message: '🌏 Starting BlueBase Development Server...',
		});

		run(flags, { development: true, label: '@bluebase/cli/web-static' });
	}
}