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
			message: '🏗 Building BlueBase web project...',
		});

		run(flags, { development: false, label: '@bluebase/cli/web-static' });
	}
}